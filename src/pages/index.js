import React, {useEffect, useState} from "react"
import Logo from "../assets/logo.svg"
import {graphql, useStaticQuery} from "gatsby";
import { useAtom } from 'jotai'
import { atomWithHash } from 'jotai-location'
import {Seo} from '../layouts/seo'

const searchFilterAtom = atomWithHash('q', '')

const Index = () => {
    const data = useStaticQuery(graphql`
        {
          site {
            siteMetadata {
              title
              description
            }
          },
          allMarkdownRemark {
            nodes {
              id
              frontmatter {
                title_en,
                title_fa,
                icon,
              }
            }
          }
        }
    `)

    const title = data.site.siteMetadata?.title
    const description = data.site.siteMetadata?.description
    const icons = data.allMarkdownRemark.nodes.map(icon => ({...icon.frontmatter}))

    return <Layout>
        <Seo />
        <Navigation title={title} description={description} />
        <Icons icons={icons} />
        <Footer title={title} />
    </Layout>
}

const Layout = ({children}) => <div>
    <div className='container max-w-[1100px] mx-auto px-6'>
        {children}
    </div>
</div>

const Navigation = ({title, description}) => {

    const [searchFilter, setSearchFilter] = useAtom(searchFilterAtom)

    return <div className='flex flex-col gap-2 md:flex-row items-center py-4 mb-6'>
        <Logo className='h-12' />
        <div className='text-center md:text-left'>
            <div className='text-2xl'>{title}</div>
            <div className='text-xs text-gray-500 capitalize font-semibold'>{description}</div>
        </div>
        <div className='flex-grow' />
        <div className='rounded-xl bg-white py-2 px-4 flex items-center max-w-[100%] w-[250px]'>
            <input type="text" className='outline-none flex-grow min-w-[0]' placeholder='Filter Icons..' value={searchFilter} onChange={e => setSearchFilter(e.target.value)} />
            <i className='bx bx-search text-xl'></i>
        </div>
        <a className='ml-2' href='https://github.com/mojtabaahn/persian-simple-icons'>
            <i className='bx bxl-github text-4xl'></i>
            <span className='hidden'>Github</span>
        </a>
    </div>
}

const Icons = ({icons}) => {

    const [searchFilter] = useAtom(searchFilterAtom)

    icons.filter(icon => icon.title_en.toLowerCase().includes(searchFilter.toLowerCase()) || icon.title_fa.toLowerCase().includes(searchFilter.toLowerCase()))

    return <div className='grid md:grid-cols-3 lg:grid-cols-5 gap-4'>
        {icons.map((icon, index) => <Icon icon={icon} key={index} />)}
    </div>
}

const Icon = ({icon}) => {
    const getSVG = () => document.getElementById(`icon-${icon.icon}`).outerHTML
    const downloadCallback = () => { download(icon.icon,getSVG()) }
    const copyCallback = () => {navigator.clipboard.writeText(getSVG())}


    return <div className='bg-white rounded-lg flex flex-col items-center space-y-2 py-4 shadow-lg'>
        <div className='h-[100px] w-full flex flex-col justify-center items-center'>
            <IconSVG icon={icon.icon} className='max-h-[100px] max-w-[100px]' id={`icon-${icon.icon}`} />
        </div>
        <div className='fa text-xl'>{icon.title_fa}</div>
        <div className='text-xl font-medium !mt-0'>{icon.title_en}</div>
        <div className='grid grid-cols-2 gap-2 w-[90%] text-xs font-bold'>
            <IconAction onClick={copyCallback} label='Copy' clickedLabel='Copied!' />
            <IconAction onClick={downloadCallback} label='Download' clickedLabel='Downloaded!' />
        </div>
    </div>
}

const IconAction = ({onClick, label, clickedLabel}) => {
    const [clicked, setClicked] = useState(false);
    const callback = () => {
        onClick()
        setClicked(true)
    }
    useEffect(() => {
      const timer = setTimeout(() => {setClicked(false)}, 2000)
      return () => clearTimeout(timer)
    }, [clicked]);
    return <button
        onClick={callback}
        className='bg-black text-white text-center uppercase rounded-md py-2'>
        {clicked ? clickedLabel : label}
    </button>
}

const IconSVG = ({icon, ...props}) => {
    let Icon = require('../../icons/' + icon)
    return <Icon {...props} />
}

const Footer = ({title}) => <div className='mt-8 text-center py-3 text-gray-600'>
    {title}
</div>


function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
export default Index
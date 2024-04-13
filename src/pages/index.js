import * as React from "react"
import Logo from "../images/logo.svg"
import {graphql, useStaticQuery} from "gatsby";
import { atom } from 'jotai'
import { useAtom } from 'jotai'
import {Seo} from '../layouts/seo'

const searchFilterAtom = atom('')

const Index = () => {
    return <Layout>
        <Seo />
        <Navigation />
        <Icons />
        <Footer />
    </Layout>
}

const Layout = ({children}) => <div>
    <div className='container max-w-[1100px] mx-auto'>
        {children}
    </div>
</div>

const Navigation = () => {

    const [searchFilter, setSearchFilter] = useAtom(searchFilterAtom)

    return <div className='flex items-center py-4 mb-6'>
        <Logo className='h-12 mr-2' />
        <div className=''>
            <div className='text-2xl'>Persian Simple Icons</div>
            <div className='text-xs text-gray-500 capitalize font-semibold'>20+ free SVG icons for persian popular brands</div>
        </div>
        <div className='flex-grow' />
        <div className='rounded-xl bg-white py-2 px-4 flex items-center'>
            <input className='outline-none min-w-[250px]' placeholder='Filter Icons..' value={searchFilter} onChange={e => setSearchFilter(e.target.value)} />
            <i className='bx bx-search text-xl'></i>
        </div>
        <a className='ml-2' href='/'>
            <i className='bx bxl-github text-4xl'></i>
        </a>
    </div>
}

const Icons = () => {

    const [searchFilter, setSearchFilter] = useAtom(searchFilterAtom)

    const data = useStaticQuery(graphql`
        {
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

    let icons = data.allMarkdownRemark.nodes.map(icon => ({
        ...icon.frontmatter,
    })).filter(icon => icon.title_en.toLowerCase().includes(searchFilter.toLowerCase()) || icon.title_fa.toLowerCase().includes(searchFilter.toLowerCase()))

    return <div className='grid grid-cols-5 gap-4'>
        {icons.map((icon,index) => <div key={index} className='bg-white rounded-lg flex flex-col items-center space-y-2 py-4 shadow-lg'>
            <div className='h-[100px] w-full flex flex-col justify-center items-center'>
                <IconSVG icon={icon.icon} className='max-h-[100px] max-w-[100px]' />
            </div>
            <div className='fa text-xl'>{icon.title_fa}</div>
            <div className='text-xl font-medium !mt-0'>{icon.title_en}</div>
            <div className='grid grid-cols-2 gap-2 w-[90%] text-sm font-bold'>
                <button className='bg-black text-white text-center uppercase rounded-lg py-1'>Copy</button>
                <button className='bg-black text-white text-center uppercase rounded-lg py-1'>Download</button>
            </div>
        </div>)}
    </div>
}

const IconSVG = ({icon, ...props}) => {
    let Icon = require('../../icons/' + icon)
    return <Icon {...props} />
}

const Footer = () => <div className='mt-8 text-center py-3 text-gray-600'>
    Persian Simple Icons
</div>

export default Index
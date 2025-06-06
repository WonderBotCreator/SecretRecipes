import '@styles/globals.css'

import Nav from '@components/Nav'
import Provider from '@components/Provider'
import { getSession,useSession } from '@node_modules/next-auth/react'
import '@uploadcare/react-uploader/core.css';
import Footer from '@components/Footer';

export const metadata = {
  title: "SuitLub: Secret Recipes",
  description: "find and create wonderful menu",
  keywords: 'food recipe'
};


const RootLayout = async({children})=>{

    //const {data: session} = useSession()


    return(
        <html lang="en">
            <body>
                <Provider>
                <div className="main">
                    <div className="gradient" />
                </div>
                <main className="app bg-[#e3b986]">
                    <Nav />
                    {children}
                    <Footer/>
                </main>
                </Provider>
                

            </body>
        </html>
    )
}

export default RootLayout
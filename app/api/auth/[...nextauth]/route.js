import NextAuth from "@node_modules/next-auth";
import CredentialsProvider from "@node_modules/next-auth/providers/credentials";
import { connectToDB } from "@utils/database";
import User from "@models/user"
import { isPasswordValid } from "@utils/hash";

export const authOptions = {
    session: {
        strategy: "jwt",
        maxAge: 60*60,
    },
    pages: {
        signIn: "/login"
    },
    secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    encryption: true,
    secret: process.env.NEXTAUTH_SECRET
  },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {},
                password: {}
            },

            async authorize(credentials, req) {
                await connectToDB()

                const user = await User.findOne({ username: credentials.username })

                

                const passwordCorrect = user === null ? false : await isPasswordValid(credentials.password, user.passwordHash)
                if (!user) {
                    return NextResponse.json({
                        success: false, message: 'User or password is invalid.',

                    })
                }

                

                if (!passwordCorrect) {
                    return NextResponse.json({
                        success: false, message: 'User or password is invalid.',

                    })
                }

                if (!(user && passwordCorrect)) {

                    return null
                }
                
                const account = {
                    name: user.username,
                    email: user.email
                }

                return account
            },
        })
    ],

     callbacks: {
                async jwt({token, user, session, trigger }) {
                    //console.log("jwt callback", {token, user, session})

                    if(trigger === "update" && session?.name){
                        token.name = session.name
                    }
                    if (user) {
                        return{
                            ...token,
                            id: user.id,
                            email: user.email
                        }
                        token.accessToken = account?.accessToken
                    }
                    return token
                },
                async session({ session, token, user }) {
                    await connectToDB()
                    const userObject = await User.findOne({ username: session.user.name })
                    session.user.id = userObject.id
                    session.user.token = token
                    return session
                }
    }

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
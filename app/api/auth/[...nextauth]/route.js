import {nextAuthOptions} from "next-auth"
import NextAuth from "next-auth/next";
import axios from "axios";
import GoogleProvider from "next-auth/providers/google"
const Google_Client_Id=process.env.Google_Client_Id
const Google_Client_Secret=process.env.Google_Client_Secret
const auth={
    session:{
        strategy:'jwt'
    },
    providers:[
        GoogleProvider({
            clientId:Google_Client_Id,
            clientSecret:Google_Client_Secret
        })
    ],  
    callbacks:{
        async signIn({account,profile}){
            if(!profile?.email){
                throw new Error("no profile")
            }
            const res=await axios.post("http://localhost:8000/adduser",{email:profile.email,name:profile.name,image:profile.image})
            if (res.status === 200) {
                return true;
            } else {
                throw new Error("Failed to add user");
            }
        }
    }

}
const handler=NextAuth(auth)
export {handler as GET, handler as POST}
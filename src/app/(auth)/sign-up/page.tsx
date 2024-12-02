"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z  from "zod"
import Link from 'next/link'
import {useState,useEffect} from 'react'
import { useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'
import {signUpSchema} from '@/schemas/signUpSchema'
import axios ,{AxiosError} from "axios"
import { ApiResponce } from "@/types/apiResponce"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"



const page = () => {
  const [username, setUsername] = useState('')
  const [usernameMessage, setUsernameMessage] = useState('')
  const [ischeckingusername, setIsCheckingUsername] = useState(false)
  const [issubmitting, setIsSubmitting] = useState(false)
  const debounced =useDebounceCallback(setUsername ,200)
  const {toast} =useToast()
  const router = useRouter()
  const form = useForm<z.infer< typeof signUpSchema>>({
        resolver : zodResolver(signUpSchema),
        defaultValues : {
          username: "",
          email: "",
          password: ""
        }
  })
  useEffect( ()=>{

    const checkUsernameUnique = async () => {
      if(username){
        setIsCheckingUsername(true)
        setUsernameMessage('')
        try {
          const response = await axios.get(`/api/check-username-unique?username=${username}`)
          setUsernameMessage(response.data.message)
        } catch (error) {
          const axiosEror = error as AxiosError<ApiResponce>
          setUsernameMessage(axiosEror.response?.data.message ?? "Error checking username")
        }
         finally{
          setIsCheckingUsername(false)
         }
    }
  }
  checkUsernameUnique()
  },[username])
const onSubmit = async (data: z.infer<typeof signUpSchema>)=>{
      setIsSubmitting(true)
      try {
        const  response = await axios.post<ApiResponce>( '/api/sign-up',data)
        toast({
          title: 'Success',
          description: response.data.message
        })
        router.replace(`/verify/${username}`)
        console.log("redirecting" ,`/verify/${username}`)
        setIsSubmitting(false)

      } catch (error) {
        const axiosError = error as AxiosError<ApiResponce>;
        let errorMessage = axiosError.response?.data.message
        toast({
          title: "Signup Failed",
          description: errorMessage,
          variant: "destructive"
        })
        setIsSubmitting(false)
      }
}
  return (
    <div className="flex justify-center item-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Mystery Message</h1>
          <p className="mb-4">Sign Up to start your Anonymous Adventure</p>
        </div>
        <Form  {...form}>
          <form onSubmit= {form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
              <Input placeholder="username" {...field} 
                onChange={(e)=>{
                  field.onChange(e)
                  debounced(e.target.value)
                }}
                />
              </FormControl>
              {ischeckingusername && <Loader2 className="animate-spin"/>}
              <p className={`text-sm ${usernameMessage === 'Username is unique' ? 'text-green-500' :'text-red-500'}`}>
                test {usernameMessage}
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
              <Input placeholder="email" {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
              <Input placeholder="password" {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={issubmitting}>
          {
            issubmitting ?(
              <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please Wait...
              </>
            ): ('Signup')
          }
        </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>Already a member?{' '}
          <Link href='sign-in' className="text-blue-600 hover:text-blue-800">
            Sign in
          </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default page
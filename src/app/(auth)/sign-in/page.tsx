"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z  from "zod"
import Link from 'next/link'
import {useState} from 'react'
import { useToast } from "@/hooks/use-toast"
import { redirect, useRouter } from 'next/navigation'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signInSchema } from "@/schemas/signInSchema"
import { signIn } from "next-auth/react"



const page = () => {
  const {toast} =useToast()
  const router = useRouter()
  const form = useForm<z.infer< typeof signInSchema>>({
        resolver : zodResolver(signInSchema),
        defaultValues : {
          identifier: "",
          password: ""
        }
  })

const onSubmit = async (data: z.infer<typeof signInSchema>)=>{
      const result = await signIn('credentials',{
        redirect: false,
        identifier:data.identifier,
        password: data.password
      })
      if(result?.error){
        toast({
          title: "Login Failed",
          description:"Incorrect Username or Password",
          variant:"destructive"
        })
      }
      if (result?.url) {
        router.replace('/dashboard')
      }
} 
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8  bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Mystery Message</h1>
          <p className="mb-4">Sign In</p>
        </div>
        <Form  {...form}>
          <form onSubmit= {form.handleSubmit(onSubmit)} className="space-y-6">
         
          <FormField
          name="Identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email/Username</FormLabel>
              <FormControl>
              <Input placeholder="email/username" {...field} 
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
        <Button type="submit" >
          Signin
        </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>If you don't have a account Please{' '}
          <Link href='sign-up' className="text-blue-600 hover:text-blue-800">
            Sign Up
          </Link>
          </p>
        </div>
        
      </div>
    </div>
  )
}

export default page
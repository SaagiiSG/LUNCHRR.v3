"use client"
import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, Book, MessageCircle, Mail } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { section } from "framer-motion/m"
import Navbar from "../components/navbar/Navbar"
import Details from "@/components/details"
import { button } from "@nextui-org/react"
export default function HelpPage({loggedIn}) {

  
    const handleContactSupport = () => {
        const email = "saranochir.s@gmail.com";
        const subject = "Need help with Lunchrr";
        const body = "Hi support team, I need assistance with...";
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
        // Open in new tab
        window.open(mailtoLink, "_blank");
      };
        
      const [form, setForm] = React.useState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.id]: e.target.value });
      };
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        const { name, email, subject, message } = form;
        const to = "support@example.com";
        const mailSubject = subject || "Support Request";
        const body = `Hi Xperience Support,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`;
    
        const mailto = `mailto:${to}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(body)}`;
    
        window.open(mailto, "_blank");
      };
  return (
    <section className="w-full h-screen flex overflow-scroll">    
    <Navbar activebtnNumber={6} loggedIn={loggedIn}/>
    <section className="w-full rounded-tl-3xl py-4 px-4 text-white overflow-auto flex flex-col gap-4 ">
      <Details pageName="Help & Support" pagePath="/Help" />
      <div className="space-y-6">
        <div className="flex items-center">
          <HelpCircle className="h-6 w-6 mr-2" />
          <h1 className="text-3xl font-bold">Help & Support</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         
         
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Email Support
              </CardTitle>
              <CardDescription>Send us an email with your question</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                For more complex issues, send us an email and we'll get back to you as soon as possible.
              </p>
              <Button className="w-full"  onClick={handleContactSupport}>
          Contact Support
        </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                Live Chat
              </CardTitle>
              <CardDescription>Chat with our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Get real-time assistance from our friendly support team. We're here to help you with any questions.
              </p>
              <Button className="w-full" variant="outline">
                Start Chat
               </Button>
            </CardContent>
          </Card>

        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Find quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I add a new user?</AccordionTrigger>
                <AccordionContent>
                  To add a new user, navigate to the Users page and click on the "Add new user" button in the top right
                  corner. Fill in the required information and click "Add User" to create a new user account.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I generate reports?</AccordionTrigger>
                <AccordionContent>
                  You can generate reports from the Dashboard page. Select the desired date range and class, then click
                  on the "Generate Report" button. You can export reports in various formats including PDF, CSV, and
                  Excel.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How do I change my password?</AccordionTrigger>
                <AccordionContent>
                  To change your password, go to the Settings page, select the Security tab, and click on the "Change
                  Password" button. You'll need to enter your current password and then your new password twice to
                  confirm.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I export data to Excel?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can export data to Excel from most tables in the application. Look for the "Export" or
                  "Download" button near the table, select Excel as the format, and the file will be downloaded to your
                  computer.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>How do I set up notifications?</AccordionTrigger>
                <AccordionContent>
                  Notification settings can be configured in the Settings page under the Notifications tab. You can
                  choose to receive notifications via email, in-app alerts, or both, and customize which events trigger
                  notifications.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="mt-6">
      <CardHeader>
        <CardTitle>Can't find what you're looking for?</CardTitle>
        <CardDescription>Send us your question and we'll get back to you</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input id="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input id="email" type="email" value={form.email} onChange={handleChange} placeholder="Your email" required />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">
              Subject
            </label>
            <Input id="subject" value={form.subject} onChange={handleChange} placeholder="What's your question about?" />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              className="w-full form-input min-h-[100px] file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
              placeholder="Describe your question in detail"
              required
            ></textarea>
          </div>
          <Button type="submit">Submit Question</Button>
        </form>
      </CardContent>
    </Card>
      </div>
    </section>
    </section>

  )
}
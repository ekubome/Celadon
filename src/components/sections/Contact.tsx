"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail } from "lucide-react";

export function Contact() {
    return (
        <section id="contact" className="py-24 px-6 relative overflow-hidden">
            <div className="max-w-4xl mx-auto relative z-10 glass p-8 md:p-12 rounded-3xl border border-zinc-200/50 shadow-2xl shadow-zinc-200/50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-center space-y-8"
                >
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-zinc-100 to-zinc-300 rounded-2xl flex items-center justify-center text-foreground shadow-inner">
                        <Mail className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                            Let's collaborate.
                        </h2>
                        <p className="text-zinc-500 text-lg">
                            Have a project in mind? I'd love to hear about it.
                        </p>
                    </div>

                    <form className="max-w-md mx-auto space-y-4 text-left">
                        <div className="space-y-2">
                            <Input
                                placeholder="Your Name"
                                className="bg-white/50 border-zinc-200 h-12 focus:ring-zinc-400 focus:border-zinc-400 transition-all font-light"
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                placeholder="Email Address"
                                type="email"
                                className="bg-white/50 border-zinc-200 h-12 focus:ring-zinc-400 focus:border-zinc-400 transition-all font-light"
                            />
                        </div>
                        <div className="space-y-2">
                            <textarea
                                className="flex min-h-[120px] w-full rounded-md border border-zinc-200 bg-white/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-light"
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        <Button className="w-full h-12 text-lg rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                            Send Message <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </form>

                    <p className="text-xs text-zinc-400 pt-8">
                        Or email me directly at <a href="mailto:hello@example.com" className="text-primary hover:underline">hello@example.com</a>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

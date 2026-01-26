"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, Layout, Smartphone, Database } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const skills = [
    {
        icon: <Layout className="w-6 h-6" />,
        title: "Frontend Architecture",
        description: "Building scalable, performant client-side applications with Next.js and React."
    },
    {
        icon: <Smartphone className="w-6 h-6" />,
        title: "Responsive Design",
        description: "Crafting fluid interfaces that feel native on any device or screen size."
    },
    {
        icon: <Code className="w-6 h-6" />,
        title: "Clean Code",
        description: "Writing maintainable, type-safe code that stands the test of time."
    },
    {
        icon: <Database className="w-6 h-6" />,
        title: "Backend Integration",
        description: "Seamlessly connecting frontends to powerful APIs and databases."
    },
];

export function About() {
    return (
        <section id="about" className="py-24 px-6 relative">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                        Obsessed with <br />
                        <span className="text-zinc-400">details & user experience.</span>
                    </h2>
                    <p className="text-lg text-zinc-600 leading-relaxed text-balance">
                        My journey involves a constant pursuit of "simplicity on the other side of complexity".
                        I believe that good design is invisible, and great engineering is silent.
                    </p>
                    <p className="text-lg text-zinc-600 leading-relaxed text-balance">
                        With a focus on performance and accessibility, I create digital products that are not only beautiful but also robust and inclusive.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <Card className="glass border-zinc-200/50 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                                <CardContent className="p-6 space-y-4">
                                    <div className="w-12 h-12 rounded-full bg-silver-100 flex items-center justify-center text-primary">
                                        {skill.icon}
                                    </div>
                                    <h3 className="font-semibold text-lg">{skill.title}</h3>
                                    <p className="text-sm text-zinc-500 leading-relaxed">
                                        {skill.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

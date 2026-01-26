"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const projects = [
    {
        title: "Ethereal Finance",
        category: "Fintech Dashboard",
        description: "A high-performance crypto trading dashboard with real-time data visualization.",
        gradient: "from-zinc-300 to-zinc-100",
    },
    {
        title: "Lumina UI",
        category: "Design System",
        description: "Component library focused on glassmorphism and light interactions.",
        gradient: "from-zinc-800 to-zinc-600",
    },
    {
        title: "Nexus Stream",
        category: "Video Platform",
        description: "Decentralized streaming protocol interface with Web3 integration.",
        gradient: "from-silver-400 to-silver-200",
    },
];

export function Projects() {
    return (
        <section id="projects" className="py-24 px-6 relative bg-background/50">
            <div className="max-w-7xl mx-auto space-y-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center space-y-4"
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                        Selected Works
                    </h2>
                    <p className="text-zinc-500 max-w-2xl mx-auto text-lg text-balance">
                        A collection of interfaces that push the boundaries of modern web technologies.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <Card className="glass overflow-hidden border-zinc-200/50 hover:border-zinc-300 transition-colors group h-full flex flex-col">
                                <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay" />
                                </div>
                                <CardContent className="p-6 flex-grow space-y-3">
                                    <div className="text-xs font-mono text-primary uppercase tracking-wider">
                                        {project.category}
                                    </div>
                                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-zinc-500 leading-relaxed text-sm">
                                        {project.description}
                                    </p>
                                </CardContent>
                                <CardFooter className="p-6 pt-0 border-t border-zinc-100/50 flex justify-between">
                                    <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-foreground">
                                        <Github className="w-4 h-4 mr-2" /> Code
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-foreground">
                                        <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

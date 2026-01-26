import Image from "next/image";
import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function AuthorCard() {
  return (
    <div className="p-6 rounded-2xl bg-white border border-gray-100">
      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="relative w-20 h-20 mb-4">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">
            {siteConfig.author.avatar ? (
              <Image
                src={siteConfig.author.avatar}
                alt={siteConfig.author.name}
                fill
                className="object-cover rounded-full"
              />
            ) : (
              <span className="text-2xl font-semibold text-primary">
                {siteConfig.author.name.charAt(0)}
              </span>
            )}
          </div>
        </div>

        {/* Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {siteConfig.author.name}
        </h3>

        {/* Bio */}
        <p className="text-sm text-gray-500 mb-4 leading-relaxed">
          {siteConfig.author.bio || siteConfig.description}
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          {siteConfig.links.github && siteConfig.links.github !== "#" && (
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </Link>
          )}
          {siteConfig.links.twitter && siteConfig.links.twitter !== "#" && (
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </Link>
          )}
          {siteConfig.links.linkedin && siteConfig.links.linkedin !== "#" && (
            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </Link>
          )}
          {siteConfig.author.email && (
            <Link
              href={`mailto:${siteConfig.author.email}`}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

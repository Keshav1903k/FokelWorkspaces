import { useState } from "react";
import { motion } from "framer-motion";
import { AITool } from "@/constants/data";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Bookmark, BookmarkCheck, ExternalLink, Star, Cpu, MessageSquare, Image as ImageIcon, Mic, TrendingUp, Database, Video, CheckCircle, PenTool, DollarSign, Globe, Layers, Zap, Sparkles, Box } from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, React.ElementType> = {
  MessageSquare, Code: Cpu, Image: ImageIcon, Mic, TrendingUp, Database, Video,
  CheckCircle, PenTool, DollarSign, Globe, Layers, Zap, Sparkles, Box, Cpu
};

export function ToolCard({ tool, index }: { tool: AITool; index: number }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const Icon = iconMap[tool.logo] || Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="group relative flex flex-col p-6 rounded-2xl bg-card border border-border backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-[var(--shadow-card)]"
    >
      {/* Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/8 border border-primary/15 text-primary group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-300">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {tool.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded-full border border-border">
                {tool.category}
              </span>
              <div className="flex items-center gap-1 text-xs text-amber-500">
                <Star className="w-3 h-3 fill-amber-500" />
                <span>{tool.rating}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={(e) => { e.preventDefault(); setIsBookmarked(!isBookmarked); }}
          className="text-muted-foreground hover:text-primary transition-colors p-2 -mr-2 -mt-2"
        >
          {isBookmarked ? <BookmarkCheck className="w-5 h-5 text-primary" /> : <Bookmark className="w-5 h-5" />}
        </button>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-2 mb-6 relative z-10">
        {tool.description}
      </p>

      <div className="mt-auto flex flex-col gap-4 relative z-10">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tool.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="bg-secondary hover:bg-border text-xs border-border font-normal text-muted-foreground">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border mt-2">
          <Badge variant="outline" className={`border-border ${
            tool.pricing === "Free" ? "text-[#19B36B]" :
            tool.pricing === "Freemium" ? "text-blue-500" :
            tool.pricing === "Paid" ? "text-violet-500" : "text-[#F5A524]"
          }`}>
            {tool.pricing}
          </Badge>

          <Link
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ size: "sm", variant: "ghost", className: "h-8 group/btn hover:bg-primary/8 hover:text-primary text-muted-foreground" })}
          >
            Visit <ExternalLink className="w-3 h-3 ml-2 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

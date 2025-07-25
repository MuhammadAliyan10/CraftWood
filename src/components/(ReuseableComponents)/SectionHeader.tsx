import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  description: string;
  showViewAll?: boolean;
}
export default function SectionHeader({
  title,
  description,
  showViewAll = false,
}: SectionHeaderProps) {
  return (
    <div className="text-center lg:text-left flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-3 max-w-xl mx-auto lg:mx-0"
      >
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground leading-tight">
          {title}
        </h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="h-1 bg-primary rounded-full mx-auto lg:mx-0"
        ></motion.div>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      </motion.div>
      {showViewAll && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex-shrink-0"
        >
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground group"
            asChild
          >
            <a href="/products/all" aria-label="View all products">
              View All Products
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      )}
    </div>
  );
}

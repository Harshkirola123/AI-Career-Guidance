import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/50 py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-muted-foreground text-sm">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            BrightFuthers
          </h2>
          <p className="text-muted-foreground">
            Empowering careers with AI-driven guidance tailored to your goals.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-foreground font-medium mb-2">Company</h3>
          <ul className="space-y-1">
            <li>
              <a href="/about" className="hover:text-foreground transition">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground transition">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground transition">
                Careers
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-foreground transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Resources Links */}
        <div>
          <h3 className="text-foreground font-medium mb-2">Resources</h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className="hover:text-foreground transition">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground transition">
                Terms
              </a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-foreground font-medium mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-foreground">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-foreground">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-foreground">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-foreground">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-muted-foreground">
        &copy; 2025 BrightFuther. All rights reserved.
      </div>
    </footer>
  );
}

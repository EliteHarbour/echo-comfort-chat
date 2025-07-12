
import { HeartPulse } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <HeartPulse className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold">EchoComfort</span>
            </Link>
            <p className="text-muted-foreground mt-4 max-w-md">
              An AI-driven anonymous counseling platform that provides mental health
              support, resources, and self-assessment quizzes in a safe environment.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/chat" className="text-sm text-muted-foreground hover:text-foreground">
                  AI Chat
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm text-muted-foreground hover:text-foreground">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/assessment" className="text-sm text-muted-foreground hover:text-foreground">
                  Self-Assessment
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/40 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            &copy; {currentYear} EchoComfort. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <span className="text-xs text-muted-foreground">
              Made by Adnan Ahamed Farooqui
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

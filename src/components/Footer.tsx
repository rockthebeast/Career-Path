import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">CareerPath</span>
            </Link>
            <p className="text-sm opacity-80 leading-relaxed">
              Empowering rural and first-generation learners with career guidance, 
              government job information, and free learning resources.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/careers" className="hover:text-primary transition-colors">Explore Careers</Link></li>
              <li><Link to="/government-jobs" className="hover:text-primary transition-colors">Government Jobs</Link></li>
              <li><Link to="/scholarships" className="hover:text-primary transition-colors">Scholarships</Link></li>
              <li><Link to="/courses" className="hover:text-primary transition-colors">Free Courses</Link></li>
              <li><Link to="/quiz" className="hover:text-primary transition-colors">Career Quiz</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="https://www.india.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">India Gov Portal</a></li>
              <li><a href="https://swayam.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">SWAYAM</a></li>
              <li><a href="https://nptel.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">NPTEL</a></li>
              <li><a href="https://scholarships.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">NSP Portal</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact Us</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>help@careerpath.in</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>1800-XXX-XXXX (Toll Free)</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>New Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-secondary-foreground/20 text-center text-sm opacity-60">
          <p>© 2024 CareerPath India. Made with ❤️ for rural students.</p>
        </div>
      </div>
    </footer>
  );
}

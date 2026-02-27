import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { toast } from "sonner";
import CustomDateInput from "@/components/ui/CustomDateInput";

interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  content: string;
  href?: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "Address",
    content: "123 Beauty Lane, Suite 100\nNew York, NY 10001",
  },
  {
    icon: <Phone className="h-5 w-5" />,
    title: "Phone",
    content: "(555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: <Mail className="h-5 w-5" />,
    title: "Email",
    content: "hello@aestheticclinic.com",
    href: "mailto:hello@aestheticclinic.com",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: "Hours",
    content: "Mon-Fri: 9AM - 7PM\nSat: 10AM - 5PM",
  },
];

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    date: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-dark py-24 lg:py-36 overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-pink/10 blur-3xl" />
      <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-pink/5 blur-3xl" />

      <div className="mx-auto max-w-[1720px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Contact Info */}
          <div>
            <h2
              className={`font-display text-h2 text-white mb-4 transition-all duration-600 ease-expo-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Get In Touch
            </h2>
            <p
              className={`font-body text-lg text-white/70 mb-10 max-w-md transition-all duration-500 ease-smooth ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              Ready to start your journey? Contact us today for a personalized
              consultation.
            </p>

            {/* Contact Info Items */}
            <div className="space-y-6 mb-10">
              {contactInfo.map((item, index) => (
                <div
                  key={item.title}
                  className={`group flex items-start gap-4 transition-all duration-500 ease-expo-out ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-8"
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-pink group-hover:bg-pink group-hover:text-dark transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-display text-lg text-white mb-1">
                      {item.title}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-body text-white/70 hover:text-pink transition-colors duration-300 whitespace-pre-line"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <div className="font-body text-white/70 whitespace-pre-line">
                        {item.content}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div
              className={`flex gap-4 transition-all duration-500 ease-expo-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: "700ms" }}
            >
              {[
                { icon: <Instagram className="h-5 w-5" />, href: "#" },
                { icon: <Facebook className="h-5 w-5" />, href: "#" },
                { icon: <Twitter className="h-5 w-5" />, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-pink hover:text-dark transition-all duration-300 hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <div
            className={`transition-all duration-700 ease-expo-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-white/10"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="relative">
                  <label
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focusedField === "name" || formData.name
                        ? "-top-2 text-xs text-pink bg-dark px-1"
                        : "top-4 text-white/50"
                    }`}
                  >
                    Full Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="bg-white/10 border-white/20 text-white h-14 pt-2 focus:border-pink focus:ring-pink/20"
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="relative">
                  <label
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focusedField === "email" || formData.email
                        ? "-top-2 text-xs text-pink bg-dark px-1"
                        : "top-4 text-white/50"
                    }`}
                  >
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="bg-white/10 border-white/20 text-white h-14 pt-2 focus:border-pink focus:ring-pink/20"
                    required
                  />
                </div>

                {/* Phone Field */}
                <div className="relative sm:col-span-2">
                  <label
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focusedField === "phone" || formData.phone
                        ? "-top-2 text-xs text-pink bg-dark px-1"
                        : "top-4 text-white/50"
                    }`}
                  >
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    className="bg-white/10 border-white/20 text-white h-14 pt-2 focus:border-pink focus:ring-pink/20"
                  />
                </div>

                {/* Message Field */}
                <div className="relative sm:col-span-2">
                  {/* <label
                    className={`absolute left-4 transition-all duration-200 pointer-events-none z-10 ${
                      focusedField === "message" || formData.message
                        ? "-top-2 text-xs text-pink bg-dark px-1"
                        : "top-4 text-white/50"
                    }`}
                  >
                    Your Message
                  </label> */}
                  {/* <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    className="bg-white/10 border-white/20 text-white min-h-[120px] pt-4 focus:border-pink focus:ring-pink/20 resize-none"
                    required
                  /> */}
                  <CustomDateInput
                    name="date"
                    // label="Preferred Date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className={`w-full mt-6 bg-pink text-dark hover:bg-white hover:scale-[1.02] transition-all duration-500 ease-elastic h-14 text-base font-body ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-80"
                }`}
                style={{ transitionDelay: "1000ms" }}
              >
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

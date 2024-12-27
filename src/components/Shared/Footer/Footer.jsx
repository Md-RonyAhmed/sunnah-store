import { Typography } from "@material-tailwind/react";
import NewsLetter from "./Newsletter";
import { Link } from "react-router-dom";

const SITEMAP = [
  {
    title: "Company",
    links: [
      { catName: "About Us", path: "/about" },
      { catName: "Contact Us", path: "/contact" },
      { catName: "Careers", path: "/career" },
      { catName: "Blog", path: "/blog" },
    ],
  },
  {
    title: "Customer Support",
    links: [
      { catName: "FAQs", path: "/faq" },
      { catName: "Shipping Policy", path: "/policy" },
      { catName: "Return & Refund", path: "/return" },
      { catName: "Track Order", path: "/track" },
      { catName: "Support", path: "/support" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { catName: "Special Offers", path: "/special-offers" },
      { catName: "New Arrivals", path: "/new-arrivals" },
      { catName: "Categories", path: "/products" },
    ],
  },
  {
    title: "Products",
    links: [
      { catName: "Books", path: "/books" },
      { catName: "Electronics", path: "/electronics" },
      { catName: "Groceries & Foods", path: "/groceries" },
      { catName: "Clothing", path: "/clothing" },
      { catName: "Offers", path: "/offers" },
      { catName: "Others", path: "/others" },
    ],
  },
];

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-white">
      <div className="mx-auto container px-4 pt-6 sm:px-6 lg:px-8">
        {/* Sitemap Section */}
        <div className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-2 md:grid-cols-4">
          {SITEMAP.map(({ title, links }, key) => (
            <div key={key}>
              <Typography
                variant="small"
                className="mb-4 font-bold uppercase text-white border-b-2 border-white"
              >
                {title}
              </Typography>
              <ul className="space-y-1">
                {links.map(({ catName, path }, linkKey) => (
                  <li key={linkKey}>
                    <Link
                      to={path}
                      className="block py-1 transition-transform hover:scale-105"
                    >
                      {catName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment and Newsletter Section */}
        <div className="flex flex-col items-center gap-6 py-6 sm:flex-row sm:justify-between">
          <img
            src="https://www.khaasfood.com/wp-content/uploads/2022/12/SSL-Commerz-Pay-With-logo-All-Size-03-scaled.webp"
            alt="Payment Methods"
            className="w-full sm:w-64 lg:w-[65%] 2xl:w-[70%]"
          />
          <NewsLetter />
        </div>

        {/* Footer Bottom Section */}
        <div className="flex flex-col items-center justify-between border-t border-gray-500 py-4 sm:flex-row">
          <Typography
            variant="small"
            className="text-center text-sm font-normal sm:text-left"
          >
            &copy; {currentYear}{" "}
            <a href="https://material-tailwind.com/" className="hover:underline">
              Sunnah Store
            </a>
            . All Rights Reserved.
          </Typography>
          <div className="mt-2 flex gap-4 sm:mt-0">
            <a
              href="#"
              className="opacity-80 transition-opacity hover:opacity-100"
              aria-label="Facebook"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="#"
              className="opacity-80 transition-opacity hover:opacity-100"
              aria-label="Instagram"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zm0 4.4a5.718 5.718 0 110 11.438 5.718 5.718 0 010-11.438zm0 1.8a3.917 3.917 0 100 7.834 3.917 3.917 0 000-7.834zm5.217-.758a1.304 1.304 0 100 2.608 1.304 1.304 0 000-2.608z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

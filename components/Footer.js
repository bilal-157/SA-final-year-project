import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faMapMarkerAlt, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faTwitter, faInstagram, faPinterest ,faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4 relative pb-2">About Artisan Collection</h3>
            <p className="text-gray-400 mb-4">
              Discover the beauty of handmade craftsmanship. Each piece in our collection celebrates
              the skill and tradition of artisans from around the world.
            </p>
            <div className="flex space-x-4">
              {/* Facebook */}
              <Link
                href="#"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-amber-800 transition duration-300"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </Link>

              {/* Twitter/X */}
              <Link
                href="#"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-amber-800 transition duration-300"
                aria-label="Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </Link>

              {/* Instagram */}
              <Link
                href="#"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-amber-800 transition duration-300"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </Link>
              {/* LinkedIn */}
              <Link
                href="#"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-amber-800 transition duration-300"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </Link>

              {/* GitHub */}
              <Link
                href="#"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-amber-800 transition duration-300"
                aria-label="GitHub"
              >
                <FontAwesomeIcon icon={faGithub} />
              </Link>


              {/* Pinterest */}
              <Link
                href="#"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-amber-800 transition duration-300"
                aria-label="Pinterest"
              >
                <FontAwesomeIcon icon={faPinterest} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 relative pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-amber-500 transition duration-300">Home</Link></li>
              <li><Link href="/Featured" className="text-gray-400 hover:text-amber-500 transition duration-300">Featured</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-amber-500 transition duration-300">Collection</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-amber-500 transition duration-300">About</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-amber-500 transition duration-300">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 relative pb-2">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-amber-500 transition duration-300">Shipping Policy</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-amber-500 transition duration-300">Return Policy</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-amber-500 transition duration-300">Care Instructions</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-amber-500 transition duration-300">FAQs</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-amber-500 transition duration-300">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 relative pb-2">Contact Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-amber-500 mt-1 mr-3"
                />
                williamsmoses2001@gmail.com
              </li>
              <li className="flex items-start">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="text-amber-500 mt-1 mr-3"
                />
                +232 79711783
              </li>
              <li className="flex items-start">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-amber-500 mt-1 mr-3"
                />
                4 Kolleh Lane, Off Aberdeen ferry road
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Artisan Collection. All rights reserved. | Designed By William moses
            <FontAwesomeIcon
              icon={faHeart}
              className="text-amber-500 mx-1"
            />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
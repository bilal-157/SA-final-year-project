import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faTwitter, faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons'

const ContactSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center relative inline-block">
          Contact Us
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-amber-800 -mb-4"></span>
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="lg:w-1/2">
            <h3 className="text-xl font-bold mb-6">Get In Touch</h3>
            <div className="mb-8">
              <p className="flex items-center text-gray-600 mb-4">
                <FontAwesomeIcon 
                  icon={faEnvelope} 
                  className="text-amber-800 mr-3 text-lg" 
                />
                williamsmoses2001@gmail.com
              </p>
              <p className="flex items-center text-gray-600 mb-4">
                <FontAwesomeIcon 
                  icon={faPhone} 
                  className="text-amber-800 mr-3 text-lg" 
                />
                +232 79711783
              </p>
              <p className="flex items-center text-gray-600">
                <FontAwesomeIcon 
                  icon={faMapMarkerAlt} 
                  className="text-amber-800 mr-3 text-lg" 
                />
                4 Kolleh Lane, Off Aberdeen ferry road
              </p>
            </div>

            <h3 className="text-xl font-bold mb-6">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-amber-800 hover:bg-amber-800 hover:text-white transition duration-300">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-amber-800 hover:bg-amber-800 hover:text-white transition duration-300">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-amber-800 hover:bg-amber-800 hover:text-white transition duration-300">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-amber-800 hover:bg-amber-800 hover:text-white transition duration-300">
                <FontAwesomeIcon icon={faPinterest} />
              </a>
            </div>
          </div>

          <div className="lg:w-1/2 bg-white p-6 md:p-8 rounded-xl shadow-md">
            <form>
              <div className="mb-5">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Your Email"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full py-3 bg-amber-800 hover:bg-amber-700 text-white rounded-md font-medium transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
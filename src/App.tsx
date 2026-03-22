/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Scissors, 
  Calendar, 
  Instagram, 
  MapPin, 
  ChevronRight, 
  X, 
  Clock, 
  Check,
  Menu
} from 'lucide-react';

// --- Types ---
type Service = {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
};

const SERVICES: Service[] = [
  {
    id: 'signature',
    name: 'The Signature Groom',
    description: 'Precision styling, hydro-massage bath, and hand-dry finish.',
    price: '85',
    duration: '120 min'
  },
  {
    id: 'puppy',
    name: 'The Puppy Introduction',
    description: 'A gentle, sensory-focused first experience for London’s newest residents.',
    price: '45',
    duration: '60 min'
  },
  {
    id: 'refresh',
    name: 'The City Refresh',
    description: 'A quick-stop maintenance service for the busy metropolitan dog.',
    price: '35',
    duration: '30 min'
  }
];

// --- Components ---

const BookingModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    breed: '',
    service: null as Service | null,
    date: '',
    upsell: [] as string[]
  });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-oatmeal w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-black/5 rounded-full transition-colors z-10"
          >
            <X size={24} />
          </button>

          <div className="p-8 md:p-12">
            <div className="flex gap-2 mb-8">
              {[1, 2, 3, 4].map((s) => (
                <div 
                  key={s} 
                  className={`h-1 flex-1 rounded-full transition-colors ${s <= step ? 'bg-charcoal' : 'bg-charcoal/10'}`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-serif italic">Tell us about your companion</h2>
                  <div className="space-y-4">
                    <label className="block text-xs uppercase tracking-widest font-semibold opacity-50">Breed or Size</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Miniature Poodle"
                      className="w-full bg-transparent border-b border-charcoal/20 py-4 focus:border-charcoal outline-none transition-colors text-xl"
                      value={bookingData.breed}
                      onChange={(e) => setBookingData({ ...bookingData, breed: e.target.value })}
                    />
                  </div>
                  <button 
                    disabled={!bookingData.breed}
                    onClick={() => setStep(2)}
                    className="btn-primary w-full py-5 text-sm disabled:opacity-30"
                  >
                    Continue
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-serif italic">Select a Service</h2>
                  <div className="grid gap-4">
                    {SERVICES.map((service) => (
                      <button 
                        key={service.id}
                        onClick={() => {
                          setBookingData({ ...bookingData, service });
                          setStep(3);
                        }}
                        className={`text-left p-6 rounded-2xl border transition-all ${bookingData.service?.id === service.id ? 'border-charcoal bg-charcoal text-white' : 'border-charcoal/10 hover:border-charcoal/30'}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-serif text-xl">{service.name}</h3>
                          <span className="font-medium">£{service.price}</span>
                        </div>
                        <p className={`text-sm opacity-70 ${bookingData.service?.id === service.id ? 'text-white' : ''}`}>{service.description}</p>
                        <div className="flex items-center gap-2 mt-4 text-xs opacity-50">
                          <Clock size={14} />
                          <span>{service.duration}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-serif italic">Choose a Date</h2>
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                      <div key={i} className="text-[10px] font-bold opacity-30 py-2">{d}</div>
                    ))}
                    {Array.from({ length: 28 }).map((_, i) => (
                      <button 
                        key={i}
                        onClick={() => {
                          setBookingData({ ...bookingData, date: `March ${i + 1}` });
                          setStep(4);
                        }}
                        className="aspect-square flex items-center justify-center rounded-full hover:bg-charcoal hover:text-white transition-colors text-sm"
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div 
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-serif italic">Add a finishing touch?</h2>
                  <div className="space-y-3">
                    {['Blueberry Facial', 'Paw Balm', 'Teeth Cleaning'].map((upsell) => (
                      <button 
                        key={upsell}
                        onClick={() => {
                          const newUpsells = bookingData.upsell.includes(upsell)
                            ? bookingData.upsell.filter(u => u !== upsell)
                            : [...bookingData.upsell, upsell];
                          setBookingData({ ...bookingData, upsell: newUpsells });
                        }}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${bookingData.upsell.includes(upsell) ? 'border-charcoal bg-charcoal/5' : 'border-charcoal/10'}`}
                      >
                        <span className="font-medium">{upsell}</span>
                        {bookingData.upsell.includes(upsell) ? <Check size={18} /> : <div className="w-[18px] h-[18px] rounded-full border border-charcoal/20" />}
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => {
                      alert('Booking confirmed! We look forward to seeing you.');
                      onClose();
                    }}
                    className="btn-primary w-full py-5 text-sm"
                  >
                    Complete Booking
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Header = ({ onBookClick }: { onBookClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? 'bg-oatmeal/80 backdrop-blur-md py-4 shadow-sm' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <button className="md:hidden p-2">
            <Menu size={24} />
          </button>
          <nav className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">
            <a href="#services" className="hover:opacity-100 transition-opacity">Services</a>
            <a href="#about" className="hover:opacity-100 transition-opacity">Studio</a>
            <a href="#social" className="hover:opacity-100 transition-opacity">Journal</a>
          </nav>
        </div>
        
        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-7xl font-serif italic tracking-tighter">Groom Dog City</h1>
        </div>

        <button onClick={onBookClick} className="btn-primary">
          Book Now
        </button>
      </div>
    </header>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, 100]);
  const rotate = useTransform(scrollY, [0, 500], [0, 45]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Floating Elements */}
      <motion.div 
        style={{ y: y1, rotate }}
        className="absolute top-1/4 left-[10%] opacity-10 pointer-events-none"
      >
        <Scissors size={120} strokeWidth={0.5} />
      </motion.div>
      <motion.div 
        style={{ y: y2, rotate: -rotate }}
        className="absolute bottom-1/4 right-[10%] opacity-10 pointer-events-none"
      >
        <Scissors size={100} strokeWidth={0.5} className="scale-x-[-1]" />
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-40 mb-6 block">Est. London 2012</span>
          <h2 className="text-6xl md:text-8xl font-serif leading-[0.9] mb-8">
            The Art of the <br />
            <span className="italic">Canine Cut.</span>
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-70 font-light leading-relaxed mb-12">
            London’s Premier Destination for Bespoke Grooming. From Islington to the East End, we provide precision styling and holistic care for the city’s most discerning dogs.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.2 }}
          className="relative aspect-[4/5] md:aspect-[16/9] w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Dog Grooming"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-5xl font-serif mb-6 italic">Our Curated Tiers</h2>
            <p className="opacity-60 leading-relaxed">
              Every appointment is a bespoke experience tailored to your dog's unique coat, temperament, and lifestyle. We use only organic, botanical-infused products.
            </p>
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">
            Scroll to explore
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {SERVICES.map((service, i) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-8 relative">
                <img 
                  src={`https://picsum.photos/seed/dog-groom-${i}/800/1200`} 
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-500" />
              </div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-serif">{service.name}</h3>
                <span className="text-sm font-medium">From £{service.price}</span>
              </div>
              <p className="text-sm opacity-60 leading-relaxed mb-6">{service.description}</p>
              <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold opacity-40 group-hover:opacity-100 transition-opacity">
                <span>View Details</span>
                <ChevronRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const InstagramGrid = () => {
  const testimonials = [
    { name: "Luna's Owner", text: "The only place in London I trust with my Cavapoo. Absolute perfection." },
    { name: "Max's Human", text: "A truly editorial experience. Max looks like he's ready for Vogue." },
    { name: "Bella's Family", text: "The City Refresh is a lifesaver for our busy Hackney lifestyle." }
  ];

  return (
    <section id="social" className="py-32 bg-oatmeal overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-serif italic mb-4">Groomed in the City</h2>
          <p className="opacity-50 uppercase tracking-[0.2em] text-[10px] font-bold">A curated look at our latest residents</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="relative aspect-square rounded-xl overflow-hidden group shadow-lg"
            >
              <img 
                src={`https://picsum.photos/seed/groomed-${i}/600/600`} 
                alt="Groomed Dog"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6 text-center">
                <p className="text-white font-serif italic text-sm mb-4">
                  "{testimonials[i % 3].text}"
                </p>
                <span className="text-white/50 text-[10px] uppercase tracking-widest font-bold">— {testimonials[i % 3].name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-2">
            <h2 className="text-4xl font-serif italic mb-8">Groom Dog City</h2>
            <p className="text-white/50 max-w-md leading-relaxed">
              Award-winning grooming in the heart of London. We believe grooming is an art form, providing precision styling and holistic care for the city’s most discerning dogs.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8 opacity-40">Locations</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="opacity-40 shrink-0" />
                <div>
                  <p className="font-medium">Islington Studio</p>
                  <p className="opacity-50 text-xs mt-1">123 Upper St, London N1 1QP</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="opacity-40 shrink-0" />
                <div>
                  <p className="font-medium">Shoreditch Studio</p>
                  <p className="opacity-50 text-xs mt-1">45 Redchurch St, London E2 7DJ</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8 opacity-40">Connect</h4>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gold transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-gold transition-colors"><Calendar size={20} /></a>
            </div>
            <div className="mt-8">
              <a href="#" className="text-xs border-b border-white/20 pb-1 hover:border-white transition-colors">Get Directions</a>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-widest font-bold opacity-30">
          <p>© 2026 Groom Dog City London. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="selection:bg-charcoal selection:text-white">
      <Header onBookClick={() => setIsBookingOpen(true)} />
      
      <main>
        <Hero />
        <Services />
        <InstagramGrid />
      </main>

      <Footer />

      {/* Mobile Floating Action Button */}
      <motion.button 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        onClick={() => setIsBookingOpen(true)}
        className="md:hidden fixed bottom-8 right-8 z-50 bg-charcoal text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center"
      >
        <Calendar size={24} />
      </motion.button>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}

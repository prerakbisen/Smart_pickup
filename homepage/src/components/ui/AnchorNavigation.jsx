import React, { useState, useEffect, useCallback } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const AnchorNavigation = () => {
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'how-it-works', label: 'How It Works', offset: 80 },
    { id: 'features', label: 'Features', offset: 80 },

    { id: 'success-stories', label: 'Success Stories', offset: 80 },

  ];

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement?.scrollHeight;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(currentScrollY);

    const progress = (currentScrollY / (documentHeight - windowHeight)) * 100;
    setScrollProgress(Math.min(progress, 100));

    const sections = navigationItems?.map(item => ({
      id: item?.id,
      element: document.getElementById(item?.id)
    }))?.filter(section => section?.element);

    let currentSection = '';
    sections?.forEach(section => {
      const rect = section?.element?.getBoundingClientRect();
      if (rect?.top <= 150 && rect?.bottom >= 150) {
        currentSection = section?.id;
      }
    });

    if (currentSection) {
      setActiveSection(currentSection);
    }
  }, [lastScrollY, navigationItems]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const scrollToSection = (sectionId, offset) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element?.getBoundingClientRect()?.top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] bg-background border-b border-border transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
          }`}
      >
        <div className="relative">
          <div
            className="absolute top-0 left-0 h-1 bg-accent transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <img src="/assets/images/icons8-university-64.png" alt="Smart Pickup Logo" />
                </div>
                <span className="text-xl font-bold text-foreground">Smart Pickup</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems?.map((item) => (
                <button
                  key={item?.id}
                  onClick={() => scrollToSection(item?.id, item?.offset)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-250 ${activeSection === item?.id
                      ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                >
                  {item?.label}
                </button>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-3">

              <Button
                variant="default"
                size="sm"
                className="bg-accent hover:bg-accent/90"
                onClick={() => window.location.href = "http://localhost:4028/authentication-portal"}
              >
                Get Started
              </Button>

            </div>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-foreground hover:bg-muted transition-colors duration-250"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </header>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[1100] bg-background/80 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={toggleMobileMenu}
        />
      )}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[1200] w-[280px] bg-card border-l border-border md:hidden transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="text-lg font-semibold text-foreground">Menu</span>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-foreground hover:bg-muted transition-colors duration-250"
              aria-label="Close menu"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {navigationItems?.map((item) => (
                <button
                  key={item?.id}
                  onClick={() => scrollToSection(item?.id, item?.offset)}
                  className={`w-full text-left px-4 py-3 text-sm font-medium rounded-md transition-colors duration-250 ${activeSection === item?.id
                      ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                >
                  {item?.label}
                </button>
              ))}
            </div>
          </nav>

          <div className="p-4 border-t border-border space-y-2">
            <Button variant="ghost" size="default" fullWidth>
              Login
            </Button>
            <Button variant="default" size="default" fullWidth className="bg-accent hover:bg-accent/90">
              Request Demo
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnchorNavigation;
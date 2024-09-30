type NavLink = {
  href: string;
  label: string;
};

export const links: NavLink[] = [
  {href: '/', label: ''},
  {href: '/admin', label: 'admin'},
  {href: '/bookings', label: 'bookings'},
  {href: '/favorites', label: 'favorites'},
  {href: '/profile', label: 'profile'},
  {href: '/reviews', label: 'reviews'},
  {href: '/rentals/create', label: 'create rental'},
  {href: '/rentals', label: 'rentals'},
  {href: '/reservations', label: 'reservations'},
]
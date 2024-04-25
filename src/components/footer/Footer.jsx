
const Footer = () => {
  return (
    <>
      <footer className="footer p-10 bg-neutral text-neutral-content">
        <aside>
          <p className="text-xl font-bold uppercase">
            <span className='text-indigo-400'>B</span>
            <span className='text-teal-400'>y</span>
            <span className='text-indigo-400'>t</span>
            <span className='text-teal-400'>e</span>
            <span className='text-indigo-400'>b</span>
            <span className='text-teal-400'>a</span>
            <span className='text-indigo-400'>z</span>
            <span className='text-teal-400'>a</span>
            <span className='text-indigo-400'>a</span>
            <span className='text-teal-400'>r</span>
          </p>
          <p>ByteBazaar Ltd.<br />Providing reliable tech since 2023</p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>ByteBazaar © 2024 All Rights Reserved. Designed by ByteBazaar Ltd.</p>
        </aside>
      </footer>
    </>
  );
};

export default Footer;
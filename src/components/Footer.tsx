import { Link } from './Link'
import './Footer.css'

export const Footer = () => {
  return (
    <footer className="Footer">
      <section className="Footer__Body LayoutBody">
 
        <ol className="Footer__links">
          <li className="Footer__link">
            <Link href={'/graph'}>Splitting Tool</Link>
          </li>
          <li className="Footer__link">
            <Link href={'/tutorial'}>Learn</Link>
          </li>
          <li className="Footer__link">
            <Link href={'/privacy-policy'}>Privacy policy</Link>
          </li>
        </ol>
        <div className="Footer__copyright">
          © Andy Ernst {new Date().getFullYear()}. MIT license.
        </div>
      </section>
    </footer>
  )
}

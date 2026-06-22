import logoUrl from '../assets/Logo.svg'

const LogoSVG = ({ width = 80, height = 96 }) => (
  <img src={logoUrl} width={width} height={height} alt="Логотип" />
)

export default LogoSVG

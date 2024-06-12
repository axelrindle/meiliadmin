import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import logo from '../assets/logo.svg'

const version = import.meta.env.VITE_APP_VERSION ?? 'dev'
const sha = import.meta.env.VITE_APP_COMMIT ?? 'sha1337'

export default function Footer() {
    return (
        <footer className='bg-secondary text-slate-700 dark:bg-slate-800'>
            <div className="container mx-auto flex flex-row items-center gap-x-4 py-4">
                <img src={logo} alt="MeiliSearch Icon" className='h-8' />
                <p className='font-heading'>
                    MeiliAdmin
                </p>

                <div className="flex-1"></div>

                <a
                    href="https://github.com/axelrindle/meiliadmin"
                    className='text-xl'
                >
                    <FontAwesomeIcon icon={faGithub} />
                </a>

                <p className='text-sm text-slate-500'>
                    {version} @ {sha}
                </p>
            </div>
        </footer>
    )
}

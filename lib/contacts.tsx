import GithubIcon from '../public/github.svg'
import WechatIcon from '../public/wechat.svg'
import EmailIcon from '../public/email.svg'
import ResumeIcon from '../public/resume.svg'

export const contacts = [
  {
    name: 'Github',
    address: 'https://github.com/EvaLLLLL',
    Icon: () => <GithubIcon width={48} height={48} />,
  },
  {
    name: 'WeChat',
    address: 'https://github.com/EvaLLLLL',
    Icon: () => <WechatIcon width={48} height={48} />,
  },
  {
    name: 'Email',
    address: 'https://github.com/EvaLLLLL',
    Icon: () => <EmailIcon width={48} height={48} />,
  },
  {
    name: 'Resume',
    address: 'https://cv-evalllll.vercel.app/',
    Icon: () => <ResumeIcon width={48} height={48} />,
  },
]

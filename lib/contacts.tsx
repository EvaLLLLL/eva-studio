import GithubIcon from '../public/github.svg'
import WechatIcon from '../public/wechat.svg'
import EmailIcon from '../public/email.svg'
import ResumeIcon from '../public/resume.svg'
import copy from 'copy-to-clipboard'

export const contacts = [
  {
    name: 'Github',
    address: 'https://github.com/EvaLLLLL',
    Icon: () => <GithubIcon width={24} height={24} />,
  },
  {
    name: 'Email',
    address: 'mailto:17610603221@163.com"',
    Icon: () => <EmailIcon width={24} height={24} />,
  },
  {
    name: 'WeChat',
    address: 'https://github.com/EvaLLLLL',
    Icon: () => <WechatIcon width={24} height={24} />,
    callback: () => {
      copy('_lyhlyh_')
    },
  },
  {
    name: 'Resume',
    address: 'https://cv-evalllll.vercel.app/',
    Icon: () => <ResumeIcon width={24} height={24} />,
  },
]

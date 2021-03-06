import GithubIcon from '../public/github.svg'
import WechatIcon from '../public/wechat.svg'
import EmailIcon from '../public/email.svg'
import ResumeIcon from '../public/resume.svg'
import copy from 'copy-to-clipboard'
import toast from 'react-hot-toast'

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
      toast.success('已复制微信 Id')
    },
  },
  {
    name: 'Resume',
    address: 'https://resume-evalllll.vercel.app/',
    Icon: () => <ResumeIcon width={24} height={24} />,
  },
]

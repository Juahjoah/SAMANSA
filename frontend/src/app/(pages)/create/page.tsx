// 'use client'
import { CreateButton, CancleButton } from '@/components/ui/button/CreateButton'
import CreateInputButton from '@/components/ui/button/CreateInputButton'

const CreatePage = () => {
  return (
    <div>
      밈 등록 페이지
      <CreateInputButton></CreateInputButton>
      <div>
        <CreateButton></CreateButton>
        <CancleButton></CancleButton>
      </div>
    </div>
  )
}

export default CreatePage

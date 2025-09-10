import React from 'react' 
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
const AddTask = () => {
  return (
    <Card className='p-6 border-0 shadow-custom-lg bg-gradient-card'>
      <div className='flex flex-col gap-3 sm:flex-row'>
        <Input type='text' placeholder="Bạn muốn làm gì?" className="h-12 text-base border-border/50 bg-slate-50 sm:flex-1 focus:border-primary/50 focus:ring-primary/20"/>
      <Button variant="gradient" size="xl" className="px-6"><Plus className="size-5"/>Thêm</Button>
      </div>
    </Card>



  )
}

export default AddTask
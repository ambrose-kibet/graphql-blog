import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from '@/components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-8">
        <div className="text-center">
          <div className="flex justify-center gap-8 mb-8">
            <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
              <img src={viteLogo} className="h-24 p-6 hover:drop-shadow-[0_0_2em_#646cffaa] transition-all" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
              <img src={reactLogo} className="h-24 p-6 hover:drop-shadow-[0_0_2em_#61dafbaa] transition-all animate-spin" alt="React logo" />
            </a>
          </div>
          
          <h1 className="text-4xl font-bold mb-8">Vite + React + Tailwind + Shadcn/UI</h1>
          
          <div className="bg-card p-8 rounded-lg border shadow-sm mb-8 max-w-md mx-auto">
            <Button 
              onClick={() => setCount((count) => count + 1)}
              className="mb-4"
            >
              Count is {count}
            </Button>
            
            <div className="flex gap-2 justify-center mb-4">
              <Button variant="outline" size="sm">
                Outline
              </Button>
              <Button variant="secondary" size="sm">
                Secondary
              </Button>
              <Button variant="destructive" size="sm">
                Destructive
              </Button>
            </div>
            
            <p className="text-muted-foreground text-sm">
              Edit <code className="bg-muted px-1 py-0.5 rounded">src/App.tsx</code> and save to test HMR
            </p>
          </div>
          
          <p className="text-muted-foreground">
            Click on the Vite and React logos to learn more
          </p>
        </div>
      </div>
    </div>
  )
}

export default App

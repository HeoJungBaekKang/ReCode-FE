import { CardHeader, CardContent, Card } from "@/components/ui/card"

export default function Component() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="border-2 border-black rounded-lg w-3/4">
        <div className="w-full bg-white rounded-md shadow-md mr-10">
          <Card className="divide-y divide-gray-200">
            <CardHeader className="p-5 border-b border-gray-200">
              <h2 className="text-2xl font-bold">Chat Rooms</h2>
            </CardHeader>
            <CardContent>
              <ul>
                <li className="p-4 hover:bg-gray-100 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="grid gap-0.5 text-sm">
                      <div className="font-medium">Room 1</div>
                      <div className="text-gray-500 dark:text-gray-400">Last message</div>
                    </div>
                  </div>
                  <div className="mt-2 text-gray-500 text-sm">
                    <p>
                      <span>User 1, </span>
                      <span>User 2</span>
                    </p>
                  </div>
                </li>
                <li className="p-4 hover:bg-gray-100 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="grid gap-0.5 text-sm">
                      <div className="font-medium">Room 2</div>
                      <div className="text-gray-500 dark:text-gray-400">Last message</div>
                    </div>
                  </div>
                  <div className="mt-2 text-gray-500 text-sm">
                    <p>
                      <span>User 3, </span>
                      <span>User 4</span>
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          <div className="p-4">
            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create Chat Room
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


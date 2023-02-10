import { BoltIcon, ExclamationTriangleIcon, SunIcon } from '@heroicons/react/24/outline'
function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen px-2 text-white">
            <h1 className="text-5xl font-bold mb-20">ChatGPT</h1>
            <div className='flex space-x-2 text-center '>
                <div>
                    <div className="flex flex-col items-center justify-center mb-5">
                        {/** Sun Icon */}
                        <SunIcon className="h-8 w-8 " />
                        <h2 className="">Examples</h2>
                    </div>
                    <div className="space-y-2">
                        <p className="infoText">&quot;Expain Somthing to me&ldquo;</p>
                        <p className="infoText">&quot;What is the difference between a dog and a cat?&ldquo;</p>
                        <p className="infoText">&quot;What is the color of the sun?&ldquo;</p>

                    </div>
                </div>
                <div>
                    <div className="flex flex-col items-center justify-center mb-5">
                        {/** Sun Icon */}
                        <BoltIcon className="h-8 w-8 " />
                        <h2 className="">Capabilities</h2>
                    </div>
                    <div className="space-y-2">
                        <p className="infoText">&quot;Change the ChatGPT Model to use&ldquo;</p>
                        <p className="infoText">&quot;Messages are stored in Firebase&apos;s Firestore&ldquo;</p>
                        <p className="infoText">&quot;Hot Toast Notifications when ChatGpt is thinking!&ldquo;</p>

                    </div>
                </div>
                <div>
                    <div className="flex flex-col items-center justify-center mb-5">
                        {/** Sun Icon */}
                        <ExclamationTriangleIcon className="h-8 w-8 " />
                        <h2 className="">Limitations</h2>
                    </div>
                    <div className="space-y-2">
                        <p className="infoText">&quot;May occasionally generate incorrect information&ldquo;</p>
                        <p className="infoText">&quot;may occasionally produce harmful instructions or biased content&ldquo;</p>
                        <p className="infoText">&quot;Limited knowledge of world and events after 2021&ldquo;</p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
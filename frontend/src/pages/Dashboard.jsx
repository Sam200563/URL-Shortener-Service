import React ,{useState,useEffect}from 'react'
import { useNavigate } from 'react-router-dom'
import {useAuth} from '../context/AuthContext'
import { getUserlinks } from '../services/linkService'
import Spinner from '../components/Spinner'
import { QRCodeCanvas } from 'qrcode.react'

const Dashboard = () => {
  const [links,setLinks]=useState([])
    const [isLoading,setIsLoading]=useState(true)
    const [error,setError]=useState('')
    const [copiedLinkId,setCopiedLinkId]=useState(null)
    const {token,logout}=useAuth();
    const navigate = useNavigate();
  
    useEffect(()=>{
      const fetchLinks = async()=>{
        if(token) {
          try{
            const response = await getUserlinks(token)
            setLinks(response.data)
          }
         catch (error) {
          console.error('failed to fetch links:',error)
          const errormessage = error.message || 'Could not load your links';
          setError(errormessage)
        }finally{
          setIsLoading(false)
        }
      }else{
        setIsLoading(false);
        setError('You are not authirized to view this page.please log in')
      }
    };
      fetchLinks()
    },[token])
    const handleLogout =()=>{
      logout();
      navigate('/login')
    }
    const handleCopy =async(text,linkId)=>{
      try {
        await navigator.clipboard.writeText(text)
        setCopiedLinkId(linkId)
        setTimeout(()=>{
          setCopiedLinkId(null)
        },2000)
        alert("URL copied to clipboard")
      } catch (error) {
        console.error("Failed to copy URL:",error)
        alert('Failed to copy url')
      }
    };

    const handleDownloadQr =(url)=>{
      const canvas = document.getElementById(`qr-${url}`);
      const pngUrl = canvas.toDataURL("image/png").replace('image/png','image/octet-stream');
      const downloadLink = document.createElement('a')
      downloadLink.href=pngUrl;
      downloadLink.download='qr-code.png';
      downloadLink.click()
    }
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">My Dashboard</h2>
        <button onClick={handleLogout} className="bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded-md font-semibold">
          Logout
        </button>
      </div>
      
      {/* The main content container */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex justify-center"><Spinner /></div>
        ) : error ? (
          <p className="p-6 text-red-500">Error: {error}</p>
        ) : links.length > 0 ? (
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="p-4 font-semibold">Original URL</th>
                <th className="p-4 font-semibold">Short URL</th>
                <th className="p-4 font-semibold text-center">Clicks</th>
                <th className="p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) => (
                <tr key={link._id} className="border-b last:border-0 hover:bg-slate-50">
                  <td className="p-4 max-w-xs truncate">
                    <a href={link.longUrl} title={link.longUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {link.longUrl}
                    </a>
                  </td>
                  <td className="p-4">
                    <a href={link.shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-mono hover:underline">
                      {link.shortUrl}
                    </a>
                  </td>
                  <td className="p-4 text-center font-semibold">{link.clicks}</td>
                  <td className="p-4 space-y-2">
                    <button onClick={() => handleCopy(link.shortUrl, link._id)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded-md">
                      {copiedLinkId === link._id ? 'Copied!' : 'Copy'}
                    </button>
                    <div>
                      <QRCodeCanvas id={`qr-${link.shortUrl}`} value={link.shortUrl} size={64}/>
                      <button onClick={()=>handleDownloadQr(link.shortUrl)}
                        className='block mt-1 text-xs text-blue-600 hover:underline'>Download QR</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="p-6 text-center text-slate-500">You haven't created any links yet.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard

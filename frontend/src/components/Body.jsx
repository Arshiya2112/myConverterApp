
import React, { useState } from 'react'
import { FaFileWord } from "react-icons/fa";
import axios from "axios";

function Body() {

  const [selectedFile, setSelectedFile] = useState(null);
  // console.log(selectedFile);

  const [convert, setConvert] = useState("");

  const [downloadError, setDownloadError] = useState("");

  const handleFileChange = (e) => {
    // console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);

  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setConvert("Please Upload a File");
      return;
    }
    const formData = new FormData()
    formData.append("file", selectedFile);
    try {
      const response = await axios.post("http://localhost:3000/convertFile", formData, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", selectedFile.name.replace(/\.[^/.]+$/, "") + ".pdf");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      setSelectedFile(null);
      setDownloadError("");
      setConvert("File Succesfully Converted to PDF");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status == 400) {
        setDownloadError("Error : ", error.response.data.message);
      }
      else {
        setConvert("");
      }

    }
  };

  return (
    <>
      <div className='max-w-screen-2xl mx-auto container px-6 py-3 md:px-40'>
        <div className='flex items-center h-screen justify-center'>
          <div className='border-2 border-dashed px-4 py-2 md:px-8 md:py-6 border-indigo-400 rounded-lg shadow-lg'>
            <h1 className='text-3xl font-bold text-center mb-4 pt-2'>Convert Word to PDF</h1>
            <p className='text-sm text-center mb-2'>Easily convert Word documents to PDF format online, without having to install any software.</p>

            <div className='flex flex-col items-center space-y-4'>
              <input
                type="file"
                accept='.doc,.docx'
                className='hidden'
                id="FileInput"
                onChange={handleFileChange} />
              <label htmlFor="FileInput" className='w-full flex item-center justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg shadow-lg cursor-pointer border-indigo-300 hover:bg-indigo-700 duration-300 hover:text-white'>
                <FaFileWord className='text-2xl mr-3' />
                <span
                  className='text-xl mr-2 '>
                  {selectedFile ? selectedFile.name : "UPLOAD FILE"}
                </span>
              </label>
              <button
                onClick={handleSubmit}
                disabled={!selectedFile}
                className=' disabled:bg-gray-300 disabled:pointer-events-none text-white bg-indigo-500 hover:bg-indigo-700 duration-300 font-bold px-4 py-2 rounded-lg'>Convert File</button>
              {convert && (
                <div className='text-green-500 text-center'>{convert}</div>
              )}
              {downloadError && (
                <div className='text-red-500 text-center'>{downloadError}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Body;
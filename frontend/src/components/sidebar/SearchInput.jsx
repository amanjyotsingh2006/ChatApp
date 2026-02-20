import { FaSearch } from "react-icons/fa";
import { useState } from "react"
import useConversation from "../../zustand/userConversation";
import useGetConversation from "../../hooks/useGetConversation"
import toast from "react-hot-toast";

const SearchInput = () => {
    const [search, setSearch] = useState("")
    const { setSelectedConversation } = useConversation();
    const { conversations } = useGetConversation()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) return;
        if (search.length < 3) {
            return toast.error("Search term must be atleast 3 characters long")
        }

        const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));
        if (conversation) {
            setSelectedConversation(conversation)
            setSearch('');
        }
        else {
            toast.error("No Such User found")
        }
    }
    return (
        <form onSubmit={handleSubmit} className='flex items-center gap-2 p-2'>
            <input type="text" name="search" id="search" placeholder='Search...' className='bg-black text-white input input-bordered rounded-full'
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                }}
            />
            <button className='bg-sky-500 p-3 rounded-4xl'>
                <FaSearch className='w-6 h-6 outline-none' />
            </button>
        </form>
    )
}

export default SearchInput

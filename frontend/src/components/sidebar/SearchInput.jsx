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
        <form onSubmit={handleSubmit} className='flex items-center gap-2 shrink-0'>
            <input
                type="text"
                name="search"
                id="search"
                placeholder='Search...'
                className='flex-1 h-11 bg-white/5 border border-white/10 text-white placeholder:text-gray-500 rounded-full px-4 text-sm focus:outline-none focus:border-blue-500 transition-colors'
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                }}
            />
            <button
                type="submit"
                className='shrink-0 bg-gradient-to-br from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 p-3 rounded-full transition-all active:scale-95 shadow-md shadow-blue-900/30'
            >
                <FaSearch className='w-4 h-4 text-white' />
            </button>
        </form>
    )
}

export default SearchInput
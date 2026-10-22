import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectAuthStatus } from '../../store/selectors'
import { googleThunk } from '../../store/authSlice'

export default function GoogleButton() {
    const dispatch = useAppDispatch()
    const isPending = useAppSelector(selectAuthStatus) === "pending"

    return (
        <button
            type='button'
            disabled={isPending}
            onClick={() => dispatch(googleThunk())}
            className='flex items-center gap-2 rounded-full bg-[#F6F7FB] px-5 py-2.5 text-sm font-medium disabled:opacity-50 shadow-sm cursor-pointer'>
            <img
                src={`${import.meta.env.BASE_URL}google-icon.svg`}
                alt=""
                aria-hidden="true"
                className="h-4 w-4"
            />
            <p>Google</p>
        </button >
    )
}

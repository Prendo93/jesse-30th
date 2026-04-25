import type { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export function ContinueButton({ className = '', children, ...rest }: Props) {
  return (
    <button
      type="button"
      {...rest}
      className={
        'border-4 border-hud-gold bg-hud-stone px-6 py-2 font-rune text-lg uppercase tracking-[0.3em] text-hud-gold ' +
        'shadow-[inset_0_0_0_2px_#0d0a07] transition-transform hover:scale-[1.02] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-40 ' +
        className
      }
    >
      {children}
    </button>
  )
}

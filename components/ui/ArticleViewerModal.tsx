'use client'

import * as React from 'react'
import { FullScreenDialog, FullScreenDialogContent } from '@/components/ui/FullScreenDialog'
import { cn } from '@/lib/utils'

interface ArticleViewerModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  meta?: React.ReactNode
  lead?: React.ReactNode
  taxonomy?: React.ReactNode
  hero?: React.ReactNode
  actions?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export function ArticleViewerModal({
  isOpen,
  onClose,
  title,
  meta,
  lead,
  taxonomy,
  hero,
  actions,
  children,
  className,
}: ArticleViewerModalProps) {
  return (
    <FullScreenDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <FullScreenDialogContent
        title={title}
        className={cn(
          'h-[96vh] w-[96vw] max-w-5xl rounded-2xl border border-gray-200 bg-white shadow-2xl',
          className
        )}
      >
        <article className="mx-auto w-full max-w-[720px] px-6 pb-24 pt-16 md:px-8 md:pt-24">
          <header className="mb-8">
            {meta && (
              <div className="mb-4 flex flex-wrap items-center gap-3">
                {meta}
              </div>
            )}
            <h1 className="text-4xl font-serif font-black leading-[1.15] text-gray-900 md:text-5xl">
              {title}
            </h1>
            {lead && (
              <div className="mt-6 text-xl font-light leading-snug text-gray-500 md:text-2xl">
                {lead}
              </div>
            )}
            {taxonomy && (
              <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-gray-100 pb-8">
                {taxonomy}
              </div>
            )}
          </header>

          {hero && <div className="mb-12">{hero}</div>}
          {actions && <div className="mb-12 flex flex-wrap gap-4">{actions}</div>}

          <div className="space-y-12">{children}</div>
        </article>
      </FullScreenDialogContent>
    </FullScreenDialog>
  )
}

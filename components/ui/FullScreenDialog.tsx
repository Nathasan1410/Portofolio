'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

import { cn } from '@/lib/utils'

const FullScreenDialog = DialogPrimitive.Root

const FullScreenDialogTrigger = DialogPrimitive.Trigger

const FullScreenDialogPortal = DialogPrimitive.Portal

const FullScreenDialogClose = DialogPrimitive.Close

const FullScreenDialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
))
FullScreenDialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const FullScreenDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    title?: string
  }
>(({ className, title, children, ...props }, ref) => (
  <FullScreenDialogPortal>
    <FullScreenDialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
        'w-[90vw] md:w-[80vw] lg:w-[70vw] max-h-[90vh]',
        'flex flex-col',
        'border bg-background shadow-lg',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:slide-out-to-bottom-10 data-[state=open]:slide-in-from-bottom-10',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:duration-300 data-[state=open]:duration-300',
        'ease-out',
        className,
      )}
      {...props}
    >
      {title && (
        <DialogPrimitive.Title className="sr-only">
          {title}
        </DialogPrimitive.Title>
      )}
      <div className="flex-1 overflow-auto p-6">{children}</div>
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-6 w-6" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </FullScreenDialogPortal>
))
FullScreenDialogContent.displayName = DialogPrimitive.Content.displayName

export {
  FullScreenDialog,
  FullScreenDialogPortal,
  FullScreenDialogOverlay,
  FullScreenDialogTrigger,
  FullScreenDialogClose,
  FullScreenDialogContent,
}

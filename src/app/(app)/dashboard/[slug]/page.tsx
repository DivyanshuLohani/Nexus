import AddLink from '@/components/dashboard/add-link'
import LinksList from '@/components/dashboard/links-list'
import Preview from '@/components/dashboard/preview'
import { auth } from '@/lib/auth';
import { getPageBySlug } from '@/lib/services/linkPage';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import React from 'react'

export default async function Page(

    { params }: { params: Awaited<{ slug: string }> }

) {
    const { slug } = await params;
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return null;
    }
    const page = await getPageBySlug(session.user.id, slug);
    if (!page) {
        return notFound();
    }



    return (
        <main className='p-0'>
            {/* Add a top bar where we will have view live and save  */}
            <div className="flex justify-between sticky top-0 items-center mb-8 bg-surface-low p-4 rounded-xl border border-outline-variant">
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold text-on-surface">Editor</h1>
                    <p className="text-xs text-on-surface-variant">Customize your page and links</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 text-sm font-medium text-on-surface hover:bg-surface-high rounded-lg transition-colors">
                        View Live
                    </button>
                    <button className="px-4 py-2 text-sm font-medium bg-inverse-surface text-inverse-primary rounded-lg hover:opacity-90 transition-opacity">
                        Save Changes
                    </button>
                </div>
            </div>

            <div className='flex justify-around'>
                <div className="left">
                    <AddLink pageId={page.id} />
                    <LinksList initialLinks={page.links} pageId={page.id} />
                </div>
                {/* Preview Component */}
                <div className="right w-full">
                    <Preview url="https://example.com" />
                </div>
            </div>
        </main>
    )
}

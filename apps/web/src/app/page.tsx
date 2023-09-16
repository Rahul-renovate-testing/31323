import type { ComponentProps, ReactNode } from 'react'
import { ThemeSwitcher } from '@/app/components.client'
import { cn } from '@/lib/utils'

function H1({ children }: { readonly children: ReactNode }) {
  return <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{children}</h1>
}

function H2({ children }: { readonly children: ReactNode }) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
      {children}
    </h2>
  )
}

function P({ children }: { readonly children: ReactNode }) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
}

function Link({ children, className, ...props }: ComponentProps<'a'>) {
  return (
    <a
      {...props}
      className={cn('font-medium text-primary underline underline-offset-4', className)}
      rel="noopener noreferrer nofollow"
      target="_blank"
    >
      {children}
    </a>
  )
}

function Code({ children }: { readonly children: ReactNode }) {
  return (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  )
}

export default function Page() {
  return (
    <div className="container relative">
      <div className="flex items-center justify-between py-12">
        <H1>Adios Axios 👋</H1>
        <ThemeSwitcher />
      </div>
      <div className="mb-12 flex flex-col gap-8">
        <section>
          <P>
            Hello! Chances are, you&apos;ve arrived here because someone shared this page with you, suggesting
            a shift away from <Link href="https://axios-http.com/">Axios</Link> in favor of the native{' '}
            <Link href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API">Fetch API</Link>. This
            page presents a list of compelling reasons why making this transition is worth your consideration.
          </P>
        </section>
        <section>
          <H2>TLDR?</H2>
          <P>
            Axios was once a convenient library that utilized{' '}
            <Link href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest">
              <Code>XMLHttpRequest</Code>
            </Link>{' '}
            in web browsers and the http module in Node environments. However, in today&apos;s modern
            development landscape, this approach has been surpassed by the native Fetch API, which offers
            consistent functionality across browsers, Node, and even other environments.
          </P>
          <P>
            With the adoption of a unified API like Fetch, you can easily eliminate Axios as an additional
            dependency in your modern codebase, resulting in reduced bundle sizes. Moreover, the Fetch API has
            undergone full standardization, unlike Axios, which comes with its own set of nuances that often
            catch developers off-guard. This includes differences in how fetch and Axios handle promise
            rejection in various scenarios.
          </P>
          <P>
            Furthermore, certain frameworks, like Next.js, have begun exposing additional features within the
            Fetch API that may not be readily accessible when using Axios.
          </P>
        </section>
        <section>
          <H2>The Fetch API is available across all modern environments</H2>
          <P>
            Since the release of Node 18 in April 2022, the Fetch API, which had been implemented in browsers
            for over a half decade by that point,{' '}
            <Link href="https://nodejs.org/en/blog/announcements/v18-release-announce#fetch-experimental">
              became available by default in Node
            </Link>
            . In September 2023, Node 16, the last Long-Term Support (LTS) version that did not include the
            Fetch API by default,{' '}
            <Link href="https://nodejs.org/en/blog/announcements/nodejs16-eol">
              reached its end of life and is no longer maintained
            </Link>
            . Consequently, all LTS versions of Node, as well as other runtimes like Bun, now include the
            Fetch API by default (see also <Link href="https://caniuse.com/mdn-api_fetch">Can I use...</Link>
            ).
          </P>
        </section>
        <section>
          <H2>Handling errors is more natural with the Fetch API</H2>
          <P>
            When using either Axios or the Fetch API, you&apos;ll be working with promises. In both cases,
            these promises will resolve once the server&apos;s response is received. Notably, the Fetch API
            only{' '}
            <Link href="https://developer.mozilla.org/en-US/docs/Web/API/fetch#:~:text=rejects%20when%20a%20network%20error%20is%20encountered%20(which%20is%20usually%20when%20there%27s%20a%20permissions%20issue%20or%20similar)">
              &quot;rejects when a network error occurs (typically due to permission issues or similar
              problems).&quot;
            </Link>{' '}
            In all other scenarios, including when the server responds with a status code like 404, the
            promise resolves and the response object is returned and can be inspected for additional logic.
          </P>
          <P>
            In contrast, the Axios implementation rejects the promise if the returned status code falls
            outside the 2xx range, if no response is received, or if any other issues occur while setting up
            the request (see also{' '}
            <Link href="https://axios-http.com/docs/handling_errors">Handling Errors</Link> in the Axios
            docs).
          </P>
          <P>
            Although it&apos;s a matter of subjective interpretation, one can make a case that certain
            situations, like handling redirects falling within the 3xx status code range, should not trigger
            an error. Typically, it is discouraged to raise an error unless the circumstances are
            unrecoverable or so critical that they significantly disrupt the ongoing operation of the
            application, such as a genuine network error.
          </P>
        </section>
        <section>
          <H2>Incompatibilities with Next.js</H2>
          <P>
            With the introduction of the App Router in Next.js 13, developers gain access to granular caching
            options like{' '}
            <Link href="https://nextjs.org/docs/app/building-your-application/caching#fetch-optionscache">
              <Code>cache</Code>
            </Link>
            ,{' '}
            <Link href="https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnextrevalidate">
              <Code>revalidate</Code>
            </Link>
            , and{' '}
            <Link href="https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag">
              <Code>tags</Code>
            </Link>{' '}
            that can be seamlessly integrated with the Fetch API. These options are processed by the
            underlying server using a custom implementation to modify caching behavior. In contrast, Axios
            lacks support for these new custom options, compelling developers to resort to less granular
            caching alternatives in the form of{' '}
            <Link href="https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config">
              route segment configuration options
            </Link>
            .
          </P>
        </section>
        <section>
          <H2>Back to standard web APIs</H2>
          <P>
            Unlike Axios, which introduces its own abstractions and API design, the Fetch API is a
            standardized web API built on classes and functions familiar to developers across various use
            cases. For instance, explicitly using methods like{' '}
            <Link href="https://developer.mozilla.org/en-US/docs/Web/API/Response/json">
              <Code>Response.json</Code>
            </Link>
            ,{' '}
            <Link href="https://developer.mozilla.org/en-US/docs/Web/API/Response/formData">
              <Code>Response.formData</Code>
            </Link>
            , or{' '}
            <Link href="https://developer.mozilla.org/en-US/docs/Web/API/Response/blob">
              <Code>Response.blob</Code>
            </Link>{' '}
            instead of relying on automatic data deserialization. This opens up opportunities for lazy
            evaluation of incoming streams and results in cleaner code, typically adding just one extra line
            compared to what Axios would have provided.
          </P>
        </section>
        <section>
          <H2>The Fetch API is truly isomorphic</H2>
          <P>
            The term &quot;isomorphic&quot; is a fancy way of saying &quot;it works on both the client side
            and the server side.&quot; However, unlike Axios, the Fetch API is implemented identically in both
            environments, making it much easier to ensure the correctness of your code.
          </P>
        </section>
        <section>
          <H2>What about the convenience of Axios?</H2>
          <P>
            Axios offers a great deal of convenience by automatically handling tasks like setting HTTP methods
            or headers, particularly for content types. When using the Fetch API, these aspects might require
            manual configuration unless you create custom, reusable functions to abstract them according to
            your requirements. Alternatively, you can explore a dedicated wrapper for the Fetch API called{' '}
            <Link href="https://github.com/sindresorhus/ky">
              <Code>ky</Code>
            </Link>
            , which provides similar functionality while remaining a small, self-contained dependency that you
            can consider adding to your project.
          </P>
        </section>
        <section>
          <H2>Migrating off of Axios to the Fetch API</H2>
          <P>
            Unless you opt for a dedicated wrapper like <Code>ky</Code>, as mentioned earlier, you will need
            to manually migrate certain features that Axios conveniently offers out of the box.
          </P>
          <P>
            For request cancellation, you would need to utilize an{' '}
            <Link href="https://developer.mozilla.org/en-US/docs/Web/API/AbortController">
              <Code>AbortController</Code>
            </Link>
            , a part of the standard web APIs. Handling request retries, perhaps incorporating exponential
            backoff, would involve writing custom code tailored to your specific requirements.
          </P>
          <P>
            Additionally, other features you might consider migrating include{' '}
            <Link href="https://axios-http.com/docs/interceptors">interceptors</Link>, which can be easily
            implemented as small, reusable functions that you can apply to response objects.
          </P>
        </section>
        <footer className="border-t py-4">
          <p className="text-sm text-muted-foreground">
            Built by <Link href="https://github.com/ChristianIvicevic">Christian Ivicevic</Link>. The source
            code is available on <Link href="https://github.com/ChristianIvicevic/adios-axios">GitHub</Link>.
          </p>
        </footer>
      </div>
    </div>
  )
}

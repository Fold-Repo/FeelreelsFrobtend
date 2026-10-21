import { GenreMarquee, Hero, Install, Shelves, Spotlight } from './sections'

export default function HomeView() {
    return (
        <>
            <Hero />

            <GenreMarquee />

            <Spotlight />

            <Shelves />

            <Install />
        </>
    )
}

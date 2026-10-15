import { GenreMarquee, Genres, Hero, Install, Trending } from './sections'

export default function HomeView() {
    return (
        <>
            <Hero />

            <GenreMarquee />

            <Genres />

            <Trending />

            <Install />
        </>
    )
}

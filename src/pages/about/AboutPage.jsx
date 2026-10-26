import { useState, useEffect } from 'react';
import ImageSlider from '../../components/ImageSlider';
import Divider from "../../components/Devider.jsx";
import Button from "../../components/Button.jsx";

export default function About() {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        fetch('/windgear/data/settings.json')
            .then(res => res.json())
            .then(data => setSettings(data));
    }, []);

    if (!settings) return <div className="p-10 text-center font-mc text-create-copper">Загрузка...</div>;

    const screenshots = [
        '/windgear/images/gallery/1.png',
        '/windgear/images/gallery/2.png',
        '/windgear/images/gallery/3.png',
        '/windgear/images/gallery/4.png',
        '/windgear/images/gallery/5.png',
        '/windgear/images/gallery/6.png',
        '/windgear/images/gallery/7.png',
        '/windgear/images/gallery/8.png',
        '/windgear/images/gallery/9.png',
        '/windgear/images/gallery/10.png',
        '/windgear/images/gallery/11.png'
    ];

    return (
        <div className="container mx-auto px-6 py-16 max-w-5xl">
            <h1 className="text-3xl font-mc text-white mb-4">{settings.serverName}</h1>
            <p className="text-create-copper font-mc text-sm mb-10">{settings.slogan}</p>

            {/* Текстовый блок */}
            <div className="prose prose-invert max-w-none mb-12 text-lg text-create-text leading-relaxed">
                <p>{settings.about}</p>
            </div>

            <Divider count={40} />

            {/* Слайдер скриншотов */}
            <section className="py-12">
                <h2 className="text-2xl font-mc text-white mb-8">ГАЛЕРЕЯ</h2>
                <ImageSlider images={screenshots} />
            </section>

            {/* CTA Блок */}
            <section className="py-16 text-center">
                <h2 className="text-2xl font-mc text-white mb-6">Хочешь присоединиться?</h2>
                <p className="text-lg text-create-muted mb-8 max-w-2xl mx-auto">
                    Расскажи о себе, своих интересах, проектах, которыми
                    хотел бы заниматься на сервере.
                    Для нас важнее всего: постройка разнообразных проектов,
                    проведение ивентов, коммуникация, изучение Create Aeronautics.
                    Очень большим плюсом будет наличие красивых и интересных построек!
                </p>
                <Button variant="primary" href="https://discord.gg/yourlink">
                    ПОДАТЬ ЗАЯВКУ
                </Button>
            </section>
        </div>
    );
}
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

type Props = {}

function Testimonials({}: Props) {
  const testimonials = [
    {
      id: 1,
      name: 'Cessy Kitchen',
      link: 'https://www.google.com/maps/contrib/109882878879577526748/reviews?hl=en-GB',
      rating: 5,
      review: `I liked the services from reception and how I was handled they are welcoming, I felt at home and relaxed.`,
      initials: 'CK',
      service: 'Manicure client',
      image:
        'https://lh3.googleusercontent.com/a-/ALV-UjXfQIcRtK-SngwmlFJoFZ45IK4JMvkTYnV57dhSY78uyg0HKw4I=s36-c-rp-mo-br100',
    },
    {
      id: 2,
      name: 'Ramadhani Haji',
      link: 'https://www.google.com/maps/contrib/118401194888181446019/place/ChIJZ4D7fjxPXBgRYUGwn1e0p6Q/@-6.8775726,39.2340037,12z/data=!4m6!1m5!8m4!1e1!2s118401194888181446019!3m1!1e1?hl=en-GB&entry=ttu&g_ep=EgoyMDI1MDMyNC4wIKXMDSoASAFQAw%3D%3D',
      rating: 5,
      review: `Nimevutiwa sana na huduma za Sifmax wana wasusi wazuri na huduma zenu ni mzuri kwa ujumla..nitarudi tena na tena.`,
      initials: 'RH',
      service: 'Regular client',
      image:
        'https://lh3.googleusercontent.com/a-/ALV-UjUIYf9-jIrdTpgzobN46WBJ_38fnKkPKWvmd7IxDuD51ie2AUzi=w36-h36-p-rp-mo-br100',
    },
    {
      id: 3,
      name: 'Lucky Martin',
      link: 'https://www.google.com/maps/contrib/109151975178279529497/place/ChIJZ4D7fjxPXBgRYUGwn1e0p6Q/@-6.6082911,37.5633083,8z/data=!4m6!1m5!8m4!1e1!2s109151975178279529497!3m1!1e1?hl=en-GB&entry=ttu&g_ep=EgoyMDI1MDMyNC4wIKXMDSoASAFQAw%3D%3D',
      rating: 5,
      review: `They have good and caring customer services and their services are of high standards with quality.`,
      initials: 'LM',
      service: 'Regular client',
      image:
        'https://lh3.googleusercontent.com/a-/ALV-UjU0tlVJCD16TJI_WQDOQj6JLcs4gksFXO_ZAmyizR2KTRtoKuZf=w36-h36-p-rp-mo-ba2-br100',
    },
  ]

  return (
    <section id="testimonials" className="py-16 md:py-24 px-2">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied clients have to say
            about their experience at Sifmax Beauty Parlour.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-background p-6 rounded-lg shadow-sm border border-border"
            >
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-primary"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="italic text-muted-foreground mb-4">{`"${testimonial.review}"`}</p>
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={testimonial.image ?? null} />
                  <AvatarFallback>{testimonial.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">
                    {testimonial.name.split(' ')[0] +
                      ' ' +
                      testimonial.name.split(' ')[1]?.substring(0, 1)}
                    .
                  </h4>
                  <p className="text-xs text-muted-foreground">{testimonial.service}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials

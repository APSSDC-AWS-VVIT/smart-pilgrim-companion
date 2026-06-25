import { asset } from '../data/imagePaths';

export default function AboutPage() {
  const teamMembers = [
    ['1', '23BQ1A4201', 'ADHIMULAM BHARGAV SAI VISWANATH', 'M'],
    ['2', '23BQ1A4218', 'BEZAWADA MEGHANA', 'F'],
    ['3', '23BQ1A4222', 'BODEPUDI NAGA SOUMYA', 'F'],
    ['4', '23BQ1A4238', 'DERANGULA VISHNUVARDHAN', 'M'],
    ['5', '23BQ1A4269', 'JUJJURI LAKSHMI SOWMYA', 'F'],
  ];

  const logos = [
    { src: asset('ap_emblem.png'), alt: 'Andhra Pradesh emblem' },
    { src: asset('aws_naipunyam_ap_logo.png'), alt: 'AWS Naipunyam Andhra Pradesh logo' },
    { src: asset('vvit_logo.png'), alt: 'VVIT logo' },
  ];

  return (
    <section className="section-shell py-12">
      <div className="surface-card overflow-hidden rounded-[2rem]">
        <div className="grid gap-8 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-temple-gold">About the project</p>
            <h1 className="display-font max-w-2xl text-4xl font-bold leading-tight text-temple-deep sm:text-5xl">
              Smart Pilgrim Companion: Cloud-Based Spiritual Travel &amp; Temple Assistance Platform Using AWS
            </h1>
            <p className="max-w-2xl text-base leading-8 text-app-muted">
              The frontend consumes backend APIs for temple discovery, route suggestions, budget planning, schedules, nearby places, and travel guidance while preserving the project&apos;s original data and architecture.
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              {['Temple discovery', 'Travel planning', 'AWS deployment ready'].map((item) => (
                <div key={item} className="surface-card-soft rounded-2xl px-4 py-3 text-sm font-medium text-temple-ink">
                  {item}
                </div>
              ))}
            </div>

            <div className="surface-card-soft rounded-3xl p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-temple-gold">Institution</p>
              <p className="mt-3 text-sm leading-7 text-app-muted">
                Department of Computer Science &amp; Engineering - Artificial Intelligence &amp; Machine Learning (CSM)
              </p>
              <p className="mt-2 text-sm leading-7 text-app-muted">Vasireddy Venkatadri Institute of Technology</p>
              <p className="mt-2 text-sm leading-7 text-app-muted">
                Approved by AICTE and permanently affiliated to JNTUK, Accredited by NBA and NAAC with &apos;A&apos; Grade
              </p>
              <p className="mt-2 text-sm leading-7 text-app-muted">Nambur (V), Pedakakani (M), Guntur-522 508</p>
              <p className="mt-2 text-sm leading-7 text-app-muted">July 2026</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="surface-card-soft rounded-3xl p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-temple-gold">Project logos</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {logos.map((logo) => (
                  <figure key={logo.src} className="surface-card flex flex-col items-center gap-3 rounded-2xl p-4 text-center">
                    <img src={logo.src} alt={logo.alt} loading="lazy" decoding="async" className="h-20 w-full object-contain" />
                  </figure>
                ))}
              </div>
            </div>

            <div className="surface-card rounded-3xl p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-temple-gold">Project team</p>
              <div className="mt-4 overflow-hidden rounded-2xl border border-[color:var(--app-border)]">
                <table className="w-full border-collapse text-left text-sm">
                  <thead className="bg-[color:var(--app-card-soft)] text-xs uppercase tracking-[0.18em] text-app-muted">
                    <tr>
                      <th className="px-4 py-3 font-semibold">S. No.</th>
                      <th className="px-4 py-3 font-semibold">Roll Number</th>
                      <th className="px-4 py-3 font-semibold">Team Member Name</th>
                      <th className="px-4 py-3 font-semibold">Gender</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member, index) => (
                      <tr key={member[1]} className={index % 2 === 0 ? 'bg-[color:var(--app-card)]' : 'bg-[color:var(--app-bg-elevated)]'}>
                        {member.map((value) => (
                          <td key={value} className="border-t border-[color:var(--app-border)] px-4 py-3 text-temple-ink">
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
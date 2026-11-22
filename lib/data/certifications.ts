// Certificações. Os badges são servidos pelo próprio site (public/img/certs)
// para não carregar nada de terceiros no navegador; o link leva à verificação
// pública no Credly.

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  image: string;
  verifyUrl: string;
  latest?: boolean;
};

export const certifications: Certification[] = [
  {
    id: "aws-developer-associate",
    name: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    image: "/img/certs/aws-developer-associate.webp",
    verifyUrl: "https://www.credly.com/badges/7703c9c1-d0ec-438f-8eb0-9e39c62795d1",
    latest: true,
  },
  {
    id: "aws-cloud-practitioner",
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    image: "/img/certs/aws-cloud-practitioner.webp",
    verifyUrl: "https://www.credly.com/badges/44e5097c-abcb-4585-aa95-8e5c280153ce",
  },
  {
    id: "aws-academy-cloud-foundations",
    name: "AWS Academy Cloud Foundations",
    issuer: "AWS Academy",
    image: "/img/certs/aws-academy-cloud-foundations.webp",
    verifyUrl: "https://www.credly.com/badges/500cc492-d55d-4d63-a86d-cee52123fb9c",
  },
];

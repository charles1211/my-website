import { useState } from 'react';
import React from 'react';
import { Box, Button, Chip, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { GoArrowUpRight } from 'react-icons/go';
import { colors } from '../styles/theme/colors';
import ProjectsDialog from './projectsDialog';
import GhostNumber from './GhostNumber';
import { use3DTilt } from '../hooks/use3DTilt';
import { staggerContainer, safeFadeUp } from '../lib/motionVariants';

export interface IData {
  id: number;
  name: string;
  description: string;
  techStack: string[];
  gitLink: string;
  projectLink: string;
  thumbnail: string;
  visibility: string;
  type: string;
  responsibilities: string[];
  category: 'Frontend' | 'Full-Stack' | 'Freelance'; // Added for filter tabs
}

const data: IData[] = [
  {
    id: 9,
    name: 'InkSmith Studios',
    description: `Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, and Supabase for authentication, database, and file storage, this platform includes a public website with a live gallery carousel, artist roster, portfolio viewer, booking form, aftercare guide, and a contact form that sends emails via Gmail/Nodemailer. It features a booking system where customers submit appointment requests that the studio can review and manage, along with Supabase Auth for secure logins so customers can view their booking history. A protected admin CMS dashboard allows staff to manage artists with image uploads to Supabase Storage, update galleries, manage studio photos, and handle bookings without coding. The system includes server and client Supabase clients, middleware-based route protection, cloud image storage with public URLs, real-time data from Supabase Postgres, and a fully responsive dark luxury UI with custom animations and a Cinzel serif brand identity.`,
    techStack: ['react', 'next.js', 'node.js', 'lucide-react', 'typescript', 'tailwindcss', 'supabase'],
    gitLink: 'https://github.com/charles1211/InkSmith.git',
    projectLink: 'https://ink-smith.vercel.app/',
    thumbnail: '/images/inksmith.png',
    visibility: 'public',
    type: '',
    responsibilities: [],
    category: 'Full-Stack',
  },
  {
    id: 8,
    name: 'CVM Finance',
    description: `CVM Finance's website is a modern, full-featured fintech platform designed to help Filipino borrowers discover, compare, and apply for loan products with ease. It features a clean light-themed design using Deep Ocean Blue and Bright Energy Yellow as brand colors, with smooth Framer Motion animations throughout every page. Visitors can explore four loan products Pension, Employment, and Collateral-backed loans each with detailed requirements, rates, and a direct inquiry flow. The site includes a live pension loan calculator, a searchable branch locator with 50+ locations, a multi-step loan guide, and a contact form with real-time validation. Built on Next.js 14 with a fully responsive layout, the website prioritizes trust, accessibility, and conversion — reflecting CVM Finance's 30 years of reliable service to over 30,000 Filipino clients.`,
    techStack: ['react', 'next.js', 'node.js', 'shadcn/ui', 'typescript', 'tailwindcss', 'Lucide React', 'zod', 'react-hook-form'],
    gitLink: 'https://github.com/charles1211/new-cvm-website.git',
    projectLink: 'https://new-cvm-website.vercel.app/',
    thumbnail: '/images/cvmthumbnail.png',
    visibility: 'public',
    type: '',
    responsibilities: [],
    category: 'Full-Stack',
  },
  {
    id: 7,
    name: 'The Feast',
    description: `The Feast — a global Catholic prayer gathering community of the Light of Jesus family, offering worship services, inspirational talks, locations, and faith resources.`,
    techStack: ['react', 'next.js', 'node.js', 'shadcn/ui', 'typescript', 'tailwindcss'],
    gitLink: 'https://github.com/charles1211/feast-website.git',
    projectLink: 'https://feast-website.vercel.app/',
    thumbnail: '/images/feastthumbnail.png',
    visibility: 'public',
    type: '',
    responsibilities: [],
    category: 'Full-Stack',
  },
  {
    id: 6,
    name: 'Enterprise SEO Blog Engine Demo',
    description: `A modern SEO-focused blog platform built with React and TypeScript, powered by Vite for lightning-fast development and performance. The project is designed as a scalable content engine, optimised for search visibility, structured content delivery, and clean component architecture. It demonstrates efficient front-end engineering with reusable UI components, strong typing, and a performance-first build setup suitable for enterprise-level publishing.`,
    techStack: ['react', 'vite', 'node.js', 'lucide-react', 'typescript'],
    gitLink: 'https://github.com/charles1211/enterprise-seo-blog-engine.git',
    projectLink: 'https://seo-blog-demo.vercel.app/',
    thumbnail: '/images/seodemoblog.png',
    visibility: 'public',
    type: '',
    responsibilities: [],
    category: 'Frontend',
  },
  {
    id: 11,
    name: 'Cash Management System',
    description: `The Cash Management System (CMS) is a web-based financial management platform designed to streamline cash position tracking and collection workflows for a multi-branch organization. It enables users to monitor and manage key financial records including deposits in transit, outstanding checks, bank transactions, and collection working files. The system supports end-to-end collection processing — from recording collections at the branch level up to consolidation at the head office cash position form. Deposits are tracked across multiple statuses such as Pending, Approved, Rejected, and Unaccounted, ensuring full visibility over the movement of funds. File attachments can be linked to transactions, with conditional rules applied based on collection type to streamline data entry. Overall, the system provides finance teams with a centralized, structured tool for maintaining accurate and up-to-date cash positions across all branches and banks.`,
    techStack: ['Next.js 12', 'Material-UI v4', 'node.js', 'Apollo Client v3 (GraphQL)', 'TypeScript', 'Formik + Yup', 'Apollo Server (GraphQL API)', 'Prisma ORM', 'PostgreSQL', 'Azure Blob Storage'],
    gitLink: '',
    projectLink: '',
    thumbnail: '/images/cmsthumbnail.png',
    visibility: 'public',
    type: '',
    responsibilities: [],
    category: 'Full-Stack',
  },
  {
    id: 10,
    name: 'Document Management System',
    description: `This Document Management System (DMS) is a full-stack web application built with Next.js 14 and TypeScript, designed to centralize and control the lifecycle of organizational documents. It supports storing and retrieving files via Azure Blob Storage, with a Prisma ORM-backed database managing metadata, user records, and document relationships. The system enforces a multi-level document approval workflow (up to four approval stages) covering various document types including ISO documents, loan documents, departmental files, and other records. Access control is handled through document security levels and folder-level restrictions, ensuring only authorized users can view or interact with sensitive content. Users are authenticated via NextAuth, and the system provides automated email notifications (via Nodemailer) and scheduled tasks to support workflow progression. An audit trail module tracks all document activity, while built-in export capabilities (Excel/ZIP) and an in-browser document viewer round out the platform's feature set.`,
    techStack: ['Next.js 14 (App Router)', 'React', 'node.js', 'Material UI (MUI v5)', 'TypeScript', 'Formik + Yup', 'Next.js API Routes (serverless)', 'Prisma ORM', 'NextAuth', 'Azure Blob Storage', 'MySQL'],
    gitLink: '',
    projectLink: '',
    thumbnail: '/images/dmsthumbnail.png',
    visibility: 'public',
    type: '',
    responsibilities: [],
    category: 'Full-Stack',
  },
  {
    id: 1,
    name: 'The little lemon restaurant',
    description: `My capstone project, undertaken as part of the Front-End Developer Meta Course, is centered on front-end development. The project exemplifies a restaurant interface, specifically The Little Lemon Restaurant, showcasing functionalities such as table reservations and menu exploration.`,
    techStack: ['react', 'css', 'node.js', 'chakra-ui', 'javascript'],
    gitLink: 'https://github.com/charles1211/metaCapstone-Little-Lemon-Restaurant',
    projectLink: 'https://meta-capstone-little-lemon-restaurant.vercel.app/',
    thumbnail: '/images/littleLemonRestaurantThumbnail.png',
    visibility: 'public',
    type: '',
    responsibilities: [],
    category: 'Frontend',
  },
  {
    id: 2,
    name: 'Moshify',
    description: `'The Ultimate HTML5 & CSS3 Series' course led by Mosh Hamedani at CodeWithMosh. This website serves as a demonstration of a Cloud Hosting Platform.`,
    techStack: ['css', 'html'],
    gitLink: 'https://github.com/charles1211/chawify',
    projectLink: 'https://chawify.vercel.app/',
    thumbnail: '/images/chawify.png',
    visibility: 'public',
    type: '',
    responsibilities: [],
    category: 'Frontend',
  },
  {
    id: 3,
    name: 'Game-Hub',
    description: `This is a responsive website built using React 18 course by Code with Mosh.`,
    techStack: ['react', 'typescript', 'axios', 'zustand', 'chakra-ui'],
    gitLink: 'https://github.com/charles1211/game-hub',
    projectLink: 'https://charles-game-hub.vercel.app/',
    thumbnail: '/images/gamehub.png',
    visibility: 'public',
    type: '',
    responsibilities: [],
    category: 'Frontend',
  },
  {
    id: 4,
    name: 'My Portfolio',
    description: `Welcome to my simple portfolio, where I showcase my expertise as a seasoned web developer with a diverse skill set. I have a proven track record of delivering high-quality projects across various technology stacks.`,
    techStack: ['react', 'typescript', 'material-ui', 'next.js 12'],
    gitLink: 'https://github.com/charles1211/my-website',
    projectLink: 'https://charlescabarrus.vercel.app/',
    thumbnail: '/images/portfolio.png',
    visibility: 'public',
    type: '',
    responsibilities: [],
    category: 'Full-Stack',
  },
  {
    id: 5,
    name: 'Smart Bulletin Board',
    description: `Utilize a Smart TV-powered Bulletin Board to facilitate access to diverse announcements, school maps, and the enrollment process within the school campus.`,
    techStack: ['react', 'typescript', 'material-ui', 'next.js 13'],
    gitLink: '',
    projectLink: '',
    thumbnail: '/images/sbb.png',
    visibility: 'public',
    type: 'Freelance Project',
    responsibilities: ['Build the front-end design.', 'Build logical functionalities'],
    category: 'Freelance',
  },
  {
    id: 6,
    name: 'Quiz App',
    description: `Quiz app designed to challenge your knowledge and critical thinking skills, offering a variety of question types across multiple difficulty levels. Track your accuracy, speed, and performance as you compete to achieve high scores and improve your understanding in various subjects.`,
    techStack: ['react', 'typescript', 'material-ui', 'Vite', 'firabase'],
    gitLink: 'https://github.com/charles1211/quizApp.git',
    projectLink: 'https://quiz-app-af205.web.app/',
    thumbnail: '/images/quizApp.png',
    visibility: 'public',
    type: '',
    responsibilities: ['Build the front-end design.', 'Build logical functionalities'],
    category: 'Frontend',
  },
];

type FilterCategory = 'All' | 'Frontend' | 'Full-Stack' | 'Freelance';
const FILTER_TABS: FilterCategory[] = ['All', 'Frontend', 'Full-Stack', 'Freelance'];

// ─── Project Card ──────────────────────────────────────────────────────────────
interface ProjectCardProps {
  data: IData;
  onMoreInfo: (d: IData) => void;
  shouldReduce: boolean;
}

const ProjectCard = ({ data: x, onMoreInfo, shouldReduce }: ProjectCardProps) => {
  const { ref, rotateXSpring, rotateYSpring, onMouseMove, onMouseLeave } = use3DTilt(10);
  const [hovered, setHovered] = useState(false);
  const isPublic = x.visibility !== 'private' && x.projectLink;

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        rotateX: shouldReduce ? 0 : rotateXSpring,
        rotateY: shouldReduce ? 0 : rotateYSpring,
        transformStyle: 'preserve-3d',
        height: 380,
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid rgba(255,113,91,0.15)',
      }}
      whileHover={shouldReduce ? {} : {
        borderColor: 'rgba(255,113,91,0.5)',
        boxShadow: '0 20px 40px rgba(255,113,91,0.15)',
      }}
      variants={{
        hidden: { y: 30, opacity: 0 },
        show:   { y: 0,  opacity: 1, transition: { duration: 0.4 } },
      }}
    >
      {/* Thumbnail with zoom on hover */}
      <motion.img
        src={x.thumbnail}
        alt={x.name}
        whileHover={shouldReduce ? {} : { scale: 1.08 }}
        transition={{ duration: 0.4 }}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />

      {/* Persistent gradient overlay */}
      <Box
        sx={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(18,31,40,0.98) 40%, transparent)',
          zIndex: 1,
        }}
      />

      {/* Always-visible bottom content */}
      <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2.5, zIndex: 2 }}>
        <Typography sx={{ fontSize: 22, fontWeight: 600, mb: 1, letterSpacing: '-0.01em' }}>
          {x.name}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
          {x.techStack.slice(0, 3).map((tech, i) => (
            <Chip key={i} label={tech} size="small" sx={{ backgroundColor: colors.surfaceLight, color: 'white', fontSize: 11, borderRadius: '6px', border: `1px solid ${colors.glow}` }} />
          ))}
          {x.techStack.length > 3 && (
            <Chip label={`+${x.techStack.length - 3}`} size="small" sx={{ backgroundColor: colors.surfaceLight, color: colors.textSecondary, fontSize: 11, borderRadius: '6px' }} />
          )}
        </Box>
      </Box>

      {/* Hover description overlay — slides up from bottom */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: hovered ? 0 : '100%' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '20px',
          background: 'rgba(18,31,40,0.94)',
          backdropFilter: 'blur(8px)',
          zIndex: 3,
          borderTop: '1px solid rgba(255,113,91,0.2)',
        }}
      >
        <Typography
          sx={{
            fontSize: 13, color: colors.textSecondary, lineHeight: 1.6, mb: 2,
            display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}
        >
          {x.description}
        </Typography>
        {isPublic ? (
          <Button
            data-magnetic
            onClick={() => window.open(x.projectLink, '_blank', 'noopener,noreferrer')}
            sx={{ color: 'white', p: 0, textTransform: 'none', '&:hover': { color: colors.tomato } }}
          >
            <Typography sx={{ fontSize: 14, fontWeight: 500, textDecoration: 'underline', textDecorationColor: colors.tomato, textUnderlineOffset: 5 }}>
              View project
            </Typography>
            <GoArrowUpRight style={{ marginLeft: 4, fontSize: 18 }} />
          </Button>
        ) : (
          <Button
            data-magnetic
            onClick={() => onMoreInfo(x)}
            sx={{ color: 'white', p: 0, textTransform: 'none', '&:hover': { color: colors.tomato } }}
          >
            <Typography sx={{ fontSize: 14, fontWeight: 500, textDecoration: 'underline', textDecorationColor: colors.tomato, textUnderlineOffset: 5 }}>
              More Info
            </Typography>
          </Button>
        )}
      </motion.div>
    </motion.div>
  );
};

// ─── Projects ──────────────────────────────────────────────────────────────────
const Projects = () => {
  const theme = useTheme();
  const sm   = useMediaQuery(theme.breakpoints.down('sm'));
  const md   = useMediaQuery(theme.breakpoints.down('md'));
  const shouldReduce = useReducedMotion() ?? false;
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [openDialog,   setOpenDialog]   = useState(false);
  const [selectedProj, setSelectedProj] = useState<IData | undefined>();

  const filtered = activeFilter === 'All' ? data : data.filter((p) => p.category === activeFilter);
  const cols = sm ? 1 : md ? 2 : 3;

  return (
    <Grid item xs={12}>
      {/* Heading */}
      <Box sx={{ position: 'relative', mb: 2, textAlign: 'center' }}>
        <Box sx={{ position: 'absolute', left: '50%', top: '-30px', transform: 'translateX(-50%)', pointerEvents: 'none', zIndex: 0 }}>
          <GhostNumber number="03" left="0" top="0" />
        </Box>
        <motion.div variants={safeFadeUp(0, shouldReduce)} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <Typography align="center" sx={{ fontSize: { lg: 80, xs: 45 }, fontWeight: 600, letterSpacing: '-0.02em', position: 'relative', zIndex: 1 }}>
            Projects
          </Typography>
        </motion.div>
      </Box>

      {/* Filter tabs */}
      <motion.div
        variants={safeFadeUp(0.1, shouldReduce)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}
      >
        {FILTER_TABS.map((tab) => (
          <Button
            key={tab}
            data-magnetic
            onClick={() => setActiveFilter(tab)}
            sx={{
              borderRadius: '50px', px: 3, py: 0.75, textTransform: 'none', fontSize: 14, fontWeight: 500,
              border: `1px solid ${activeFilter === tab ? colors.tomato : 'rgba(255,113,91,0.2)'}`,
              backgroundColor: activeFilter === tab ? colors.tomato : 'transparent',
              color: activeFilter === tab ? 'white' : colors.textSecondary,
              transition: 'all 0.25s ease',
              '&:hover': { backgroundColor: activeFilter === tab ? colors.orange : 'rgba(255,113,91,0.08)', borderColor: colors.tomato, color: 'white' },
            }}
          >
            {tab}
          </Button>
        ))}
      </motion.div>

      {/* Card grid — desktop + tablet */}
      {!sm && (
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={activeFilter}
            variants={staggerContainer(shouldReduce ? 0 : 0.07)}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gap: 24,
            }}
          >
            {filtered.map((project) => (
              <ProjectCard
                key={project.name}
                data={project}
                shouldReduce={shouldReduce}
                onMoreInfo={(d) => { setSelectedProj(d); setOpenDialog(true); }}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Mobile: native scroll-snap */}
      {sm && (
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Box
              role="list"
              sx={{
                display: 'flex', overflowX: 'scroll', scrollSnapType: 'x mandatory', gap: 2, pb: 2,
                '&::-webkit-scrollbar': { height: 4 },
                '&::-webkit-scrollbar-thumb': { background: colors.tomato, borderRadius: 2 },
              }}
            >
              {filtered.map((project) => (
                <Box key={project.name} role="listitem" sx={{ minWidth: 280, flexShrink: 0, scrollSnapAlign: 'start' }}>
                  <ProjectCard
                    data={project}
                    shouldReduce={shouldReduce}
                    onMoreInfo={(d) => { setSelectedProj(d); setOpenDialog(true); }}
                  />
                </Box>
              ))}
            </Box>
          </motion.div>
        </AnimatePresence>
      )}

      {selectedProj && (
        <ProjectsDialog isOpen={openDialog} onClose={() => setOpenDialog(false)} data={selectedProj} />
      )}
    </Grid>
  );
};

export default Projects;

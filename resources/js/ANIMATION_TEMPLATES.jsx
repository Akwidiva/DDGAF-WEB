// ============================================================================
// ANIMATION IMPLEMENTATION TEMPLATES
// Copy and paste these templates into your pages to quickly add animations
// ============================================================================

// ============================================================================
// TEMPLATE 1: Basic Page with Simple Entrance
// ============================================================================
/*
import { motion } from 'framer-motion';
import PageTransition from '@/Components/PageTransition';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function MyPage({ auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <PageTransition>
        <div className=\"py-6\">
          <div className=\"max-w-7xl mx-auto px-6\">
            <h1>My Page</h1>
          </div>
        </div>
      </PageTransition>
    </AuthenticatedLayout>
  );
}
*/

// ============================================================================
// TEMPLATE 2: Page with Staggered List Items
// ============================================================================
/*
import { motion } from 'framer-motion';
import PageTransition from '@/Components/PageTransition';
import AnimatedList from '@/Components/AnimatedList';

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  }
};

export default function ListPage({ items }) {
  return (
    <PageTransition>
      <motion.div
        className=\"py-6\"
        variants={containerVariants}
        initial=\"initial\"
        animate=\"animate\"
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            className=\"bg-white rounded-lg p-4 mb-4 shadow-sm\"
          >
            {item.name}
          </motion.div>
        ))}
      </motion.div>
    </PageTransition>
  );
}
*/

// ============================================================================
// TEMPLATE 3: Page with Animated Cards (Dashboard-style)
// ============================================================================
/*
import { motion } from 'framer-motion';
import PageTransition from '@/Components/PageTransition';
import AnimatedCard from '@/Components/AnimatedCard';

export default function DashboardPage() {
  const stats = [
    { title: 'Total Users', value: 1250 },
    { title: 'Active Projects', value: 42 },
    { title: 'Completed Tasks', value: 156 }
  ];

  return (
    <PageTransition>
      <div className=\"py-6\">
        <div className=\"grid grid-cols-1 md:grid-cols-3 gap-6\">
          {stats.map((stat, index) => (
            <AnimatedCard key={stat.title} delay={index * 0.1}>
              <div className=\"p-6 text-center\">
                <h3 className=\"text-gray-600 text-sm font-medium\">{stat.title}</h3>
                <p className=\"text-3xl font-bold text-emerald-600 mt-2\">{stat.value}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
*/

// ============================================================================
// TEMPLATE 4: Page with Scroll Reveal Sections
// ============================================================================
/*
import ScrollReveal from '@/Components/ScrollReveal';
import PageTransition from '@/Components/PageTransition';

export default function LongPage() {
  return (
    <PageTransition>
      <ScrollReveal direction=\"up\" threshold={0.3}>
        <section className=\"py-12 px-6\">
          <h2>Section 1</h2>
          <p>This section animates when scrolled into view</p>
        </section>
      </ScrollReveal>

      <ScrollReveal direction=\"up\" threshold={0.3} delay={0.2}>
        <section className=\"py-12 px-6\">
          <h2>Section 2</h2>
          <p>This section has a slight delay</p>
        </section>
      </ScrollReveal>
    </PageTransition>
  );
}
*/

// ============================================================================
// TEMPLATE 5: Animated Form
// ============================================================================
/*
import { motion } from 'framer-motion';
import PageTransition from '@/Components/PageTransition';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 }
};

export default function CreateForm() {
  return (
    <PageTransition>
      <motion.form
        className=\"max-w-2xl mx-auto p-6 bg-white rounded-lg shadow\"
        variants={containerVariants}
        initial=\"initial\"
        animate=\"animate\"
      >
        <motion.div variants={itemVariants} className=\"mb-4\">
          <label>Name</label>
          <TextInput type=\"text\" className=\"w-full\" />
        </motion.div>

        <motion.div variants={itemVariants} className=\"mb-4\">
          <label>Email</label>
          <TextInput type=\"email\" className=\"w-full\" />
        </motion.div>

        <motion.div variants={itemVariants}>
          <PrimaryButton>Submit</PrimaryButton>
        </motion.div>
      </motion.form>
    </PageTransition>
  );
}
*/

// ============================================================================
// TEMPLATE 6: Header with Icon Animation
// ============================================================================
/*
import { motion } from 'framer-motion';
import { FiBarChart2 } from 'react-icons/fi';

export default function AnimatedHeader({ title, icon: Icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className=\"flex items-center gap-3 p-4 bg-emerald-600 text-white rounded-lg\"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.2 }}
      >
        <Icon className=\"text-2xl\" />
      </motion.div>
      <h1 className=\"text-xl font-semibold\">{title}</h1>
    </motion.div>
  );
}
*/

// ============================================================================
// TEMPLATE 7: Button with Loading State Animation
// ============================================================================
/*
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function LoadingButton({ onSubmit }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await onSubmit();
    setIsLoading(false);
  };

  return (
    <motion.button
      whileHover={!isLoading ? { scale: 1.05 } : {}}
      whileTap={!isLoading ? { scale: 0.98 } : {}}
      onClick={handleClick}
      disabled={isLoading}
      className=\"px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2\"
    >
      {isLoading ? (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity }}
            className=\"w-4 h-4 border-2 border-white border-t-transparent rounded-full\"
          />
          Loading...
        </>
      ) : (
        'Submit'
      )}
    </motion.button>
  );
}
*/

// ============================================================================
// TEMPLATE 8: Hover Card with Info Reveal
// ============================================================================
/*
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function InfoCard({ title, description }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, y: -5 }}
      className=\"bg-white rounded-lg p-6 shadow cursor-pointer\"
    >
      <h3 className=\"text-lg font-semibold\">{title}</h3>
      <motion.p
        initial={{ opacity: 0, height: 0 }}
        animate={isHovered ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className=\"text-gray-600 mt-2\"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}
*/

export default function AnimationTemplates() {
  return (
    <div className=\"p-6\">
      <h1>Animation Implementation Templates</h1>
      <p>See comments in this file for copy-paste templates</p>
    </div>
  );
}
